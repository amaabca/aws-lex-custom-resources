import {
  Construct,
  Fn,
  Reference,
} from '@aws-cdk/core';
import {
  CfnApplication,
} from '@aws-cdk/aws-sam';

interface Props {
  semanticVersion: string;
  logLevel?: string;
}

export default class extends Construct {
  application: CfnApplication;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.application = new CfnApplication(
      this,
      id,
      {
        location: {
          applicationId: 'arn:aws:serverlessrepo:us-east-1:777566285978:applications/lex-v2-cfn-cr',
          semanticVersion: props.semanticVersion,
        },
        parameters: {
          LogLevel: props.logLevel ?? 'INFO',
        },
      }
    );
  }

  serviceToken(): Reference {
    return this.application.getAtt('Outputs.LexV2CfnCrFunctionArn');
  }

  serviceLinkedRoleArn(): Reference {
    return this.application.getAtt('Outputs.LexServiceLinkedRole')
  }

  serviceLinkedRoleName(): string {
    return Fn.select(
      2,
      Fn.split(
        '/',
        Fn.select(
          5,
          Fn.split(
            ':',
            this.serviceLinkedRoleArn().toString(),
          ),
        ),
      ),
    );
  }
}
