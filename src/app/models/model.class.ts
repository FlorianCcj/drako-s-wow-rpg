export class ModelClass {
  constructor() {
  }

  hydrateObject(data) {
    const futurObject = this;
    const originObject = data;
    for (const property in futurObject) {
      if (futurObject.hasOwnProperty(property) && originObject.hasOwnProperty(property)) {
        const stringifyProperty = property.toString();
        this[stringifyProperty] = originObject[stringifyProperty];
      }
    }
  }
}
