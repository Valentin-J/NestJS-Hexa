import { Injectable, Logger } from "@nestjs/common";
import { IPublish } from "../../../domain/spi/IPublish";
import { PubSub } from "@google-cloud/pubsub";

@Injectable()
export class PubSubService implements IPublish {
    private pubSubClient: PubSub;

    private readonly logger = new Logger(PubSubService.name);

    constructor() {
        this.pubSubClient = new PubSub();
    }

    async publishMessage(topicName: string, data: any): Promise<void> {
        try {
            const messagePayload = {
                data: Buffer.from(data),
            };

            const [messageId] = await this.pubSubClient.topic(topicName).publishMessage(messagePayload);
            this.logger.log(`Message ${messageId} publié sur le topic ${topicName}`);
        } catch (error) {
            this.logger.error('Erreur lors de l\'envoi du message à Pub/Sub', error.stack);
        }
    }
}