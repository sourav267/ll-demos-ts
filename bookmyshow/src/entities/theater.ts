import Screen from "./screen";

class Theater {
  private id: string;
  private name: string;
  private address: string;
  private screens: Map<string, Screen>;

  constructor(id: string, name: string, address: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.screens = new Map();
  }

  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getAddress(): string { return this.address; }

  addScreen(screen: Screen): void {
    this.screens.set(screen.getId(), screen);
  }

  getScreen(screenId: string): Screen | undefined {
    return this.screens.get(screenId);
  }

  getAllScreens(): Screen[] {
    return Array.from(this.screens.values());
  }
}

export default Theater;