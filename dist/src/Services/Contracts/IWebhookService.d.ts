export interface IWebhookService {
    CovidPositivityCalculator(requests: any): Promise<String>;
}
