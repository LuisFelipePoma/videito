import AWS from "aws-sdk";
import { SageMakerRuntime } from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sagemakerRuntime = new AWS.SageMakerRuntime();

export class InferenceService {
  private endpointName: string;

  constructor(
    endpointName: string = process.env.SAGEMAKER_ENDPOINT_NAME || ""
  ) {
    this.endpointName = endpointName;
  }

  async predict(
    data: any,
    contentType: string = "application/json"
  ): Promise<any> {
    try {
      const params: SageMakerRuntime.InvokeEndpointInput = {
        EndpointName: this.endpointName,
        Body: JSON.stringify(data),
        ContentType: contentType,
        Accept: "application/json",
      };

      const result = await sagemakerRuntime.invokeEndpoint(params).promise();

      if (result.Body) {
        return JSON.parse(result.Body.toString());
      }

      throw new Error("Empty response from SageMaker endpoint");
    } catch (error) {
      console.error("Error calling SageMaker endpoint:", error);
      throw error;
    }
  }
}

export const inferenceService = new InferenceService();
