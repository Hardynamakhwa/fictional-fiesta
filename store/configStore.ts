import { action, computed, observable } from "mobx";
import { ColorSchemeSystem } from "nativewind/dist/style-sheet/color-scheme";

type scheme = 'system' | 'light' | 'dark';

class ConfigurationsStore {
    @observable theme: ColorSchemeSystem = 'system';

    constructor() {
    }

    set scheme(value: ColorSchemeSystem) {
        this.theme = value;
    }

    @computed get scheme() {
        return this.theme
    }

}

export { scheme };
export default new ConfigurationsStore();