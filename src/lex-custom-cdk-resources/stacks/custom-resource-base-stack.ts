import * as cdk from '@aws-cdk/core';
import { Provider } from '@aws-cdk/custom-resources';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
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

    if (this.props.type && this.props.type === BotType.V2 && !this.props.role?.customRole) {
      throw new Error("Must provide a custom IAM role for Lex V2 resources in props.role.customRole field!");
    } else if ((!this.props.type || this.props.type === BotType.V1) && !this.props.role?.parentResource && !this.props.role?.childResource) {
      throw new Error("Must provide a parentResource and a childResource for Lex V1 resources in props.role fields!");
    }

    this.createHandler();
  }

  createHandler() {
    const handlerFunction = new Function(this, `${this.id}-handlerFunc`, {
      runtime: this.props.handler.runtime || Runtime.NODEJS_14_X,
      code: Code.fromAsset(`./${this.props.handler.folder}/`),
      handler: this.props.handler.handlerName,
      timeout: cdk.Duration.seconds(this.props.handler.timeout),
      environment: this.props.handler.environment,
      role: this.props.type && this.props.type === BotType.V2 ? this.props.role?.customRole!.withoutPolicyUpdates()! : this.createHandlerRole().withoutPolicyUpdates()
    });

    const lambdaProvider = new Provider(this, `${this.id}-handlerProvider`, {
      onEventHandler: handlerFunction
    });

    const _cfnOutput = new cdk.CfnOutput(this, `${this.id}-intentProvider`, {
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
