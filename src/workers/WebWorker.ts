export default class WebWorker extends Worker {
  constructor(worker: Function) {
    const code = worker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    super(URL.createObjectURL(blob));
  }
}
