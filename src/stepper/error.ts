export default class StepError extends Error {
  constructor(readonly msg: string, readonly description?: string) {
    super(msg);
  }
}