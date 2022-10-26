import {apiProvider} from './api-provider';

class ApiCore {
  constructor(options) {
    if (options.getAll) {
      this.getAll = () => {
        return apiProvider.getAll(options.url);
      };
    }

    if (options.getSingle) {
      this.getSingle = (id) => {
        return apiProvider.getSingle(options.url, id);
      };
    }

    if (options.post) {
      this.post = (endpoint,model) => {
        return apiProvider.post(`${options.url}/${endpoint}`, model);
      };
    }

    if (options.put) {
      this.put = (model) => {
        return apiProvider.put(options.url, model);
      };
    }

    if (options.patch) {
      this.patch = (model) => {
        return apiProvider.patch(options.url, model);
      };
    }

    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.url, id);
      };
    }
  }
}

export default ApiCore