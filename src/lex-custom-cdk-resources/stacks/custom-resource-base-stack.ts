import * as cdk from '@aws-cdk/core';
import { Provider } from '@aws-cdk/custom-resources';
import { Function, Runtime, Code, IFunction } from '@aws-cdk/aws-lambda';
import { LogLevel, NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { Role, ServicePrincipal, PolicyStatement, ManagedPolicy } from '@aws-cdk/aws-iam';
import { BotType, StackProps } from './custom-resource-data-types'


export class CustomResourceBaseStack extends cdk.NestedStack {
  env: cdk.Environment;
  props: StackProps;
  id: string;

  constructor(scope: cdk.Construct, id: string, env: cdk.Environment, props: StackProps) {
    super(scope, id);
    this.env = env;
    this.props = props;
    this.id = id;

    this.createHandler();
  }

  createHandler(): void {
    if (this.props.type === BotType.V2) {
      const handlerFunction = new NodejsFunction(this, `${this.id}-handlerFunc`, {
        runtime: this.props.handler.runtime || Runtime.NODEJS_14_X,
        entry: `${this.props.handler.folder}/${this.props.handler.entry}`,
        handler: this.props.handler.handlerName,
        timeout: cdk.Duration.seconds(this.props.handler.timeout),
        environment: this.props.handler.environment,
        role: this.props.role?.customRole!.withoutPolicyUpdates()!
      });

      this.createProvider(handlerFunction);
    }
  }

  createProvider(func: Function): void {
    const lambdaProvider = new Provider(this, `${this.id}-handlerProvider`, {
      onEventHandler: func
    });

    new cdk.CfnOutput(this, `${this.id}-intentProvider`, {
      value: lambdaProvider.serviceToken,
      exportName: this.props.exportName
    });
  }

  createHandlerRole(): Role {
    const handlerRole = new Role(this, `${this.id}-handlerFuncRole`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com').grantPrincipal
    });

    handlerRole.addToPolicy(new PolicyStatement({
      resources: [`arn:aws:${this.props.role!.parentResource}:${this.env.region}:${this.env.account}:${this.props.role!.childResource}:*`],
      actions: this.props.role!.actions!
    }));

    handlerRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
    return handlerRole;
  }
}
