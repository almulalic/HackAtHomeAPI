export interface IWebhookService {
  CovidPositivityCalculator(requests): Promise<String>;
}
