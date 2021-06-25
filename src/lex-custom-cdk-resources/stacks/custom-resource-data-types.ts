import { Role } from "@aws-cdk/aws-iam";
import { Runtime } from "@aws-cdk/aws-lambda";

interface StackProps {
  exportName: string,
  handler: {
    folder: string,
    handlerName: string,
    environment: {
      [key: string]: string
    },
    timeout: number,
    runtime?: Runtime
  },
  role?: {
    parentResource?: string,
    childResource?: string,
    actions?: string[],
    customRole?: Role
  },
  type?: BotType
}


enum BotType {
  V1 = "V1",
  V2 = "V2"
}

export {
  StackProps,
  BotType
}
