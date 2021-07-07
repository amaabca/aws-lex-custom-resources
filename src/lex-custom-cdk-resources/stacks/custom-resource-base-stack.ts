/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Function,
  Runtime,
} from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { Provider } from '@aws-cdk/custom-resources';

import { StackProps } from './custom-resource-data-types';

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
    if (this.props.handler.runtime && this.props.handler.runtime != Runtime.NODEJS_14_X) {
      const handlerFunction = new Function(this, `${this.id}-handlerFunc`, {
        runtime: this.props.handler.runtime!,
        handler: this.props.handler.handlerName,
        code: this.props.handler.code,
        timeout: cdk.Duration.seconds(this.props.handler.timeout),
        environment: this.props.handler.environment,
        role: this.props.role!.withoutPolicyUpdates()!,
      });

      this.createProvider(handlerFunction);
    } else {
      const handlerFunction = new NodejsFunction(this, `${this.id}-handlerFunc`, {
        runtime: this.props.handler.runtime || Runtime.NODEJS_14_X,
        entry: `${this.props.handler.folder}/${this.props.handler.entry}`,
        handler: this.props.handler.handlerName,
        timeout: cdk.Duration.seconds(this.props.handler.timeout),
        environment: this.props.handler.environment,
        role: this.props.role!.withoutPolicyUpdates()!,
      });

      this.createProvider(handlerFunction);
    }
  }

  createProvider(func: Function): void {
    const lambdaProvider = new Provider(this, `${this.id}-handlerProvider`, {
      onEventHandler: func,
    });

    new cdk.CfnOutput(this, `${this.id}-Provider`, {
      value: lambdaProvider.serviceToken,
      exportName: this.props.exportName,
    });
  }
}
