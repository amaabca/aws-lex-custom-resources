import { Role } from "@aws-cdk/aws-iam";
import { Runtime } from "@aws-cdk/aws-lambda";

interface StackProps {
  exportName: string,
  handler: {
    folder?: string,
    entry?: string,
    code?: any,
    handlerName: string,
    environment: {
      [key: string]: string
    },
    timeout: number,
    runtime?: Runtime
  },
  role?: Role
}


export {
  StackProps
}
