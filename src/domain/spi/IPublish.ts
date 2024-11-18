export interface IPublish {
    publishMessage(topicName: string, data: any): Promise<void>;
}

export const IPublish = Symbol("IPublish");