type Resource = "auth" | "users" | "rooms" | "bookings" | "";

export class PathBuilder {
  private path: string[] = [];
  private query: Record<string, string> = {};

  constructor(private baseUrl: string) {}

  public addSegment<T extends Resource>(name: T): PathBuilder {
    this.checkQueryParams("Cannot use addSegment after addQueryParam");
    this.path.push(name);
    return this;
  }

  public addParam(param: any): this {
    this.checkQueryParams("Cannot use addParam after addQueryParam");
    const stringParam =
      typeof param === "number" ? param.toString() : String(param);
    if (!stringParam) {
      throw new Error("Invalid parameter");
    }

    this.path.push(stringParam);
    return this;
  }

  public addQueryParam(
    keyOrObject: string | Record<string, string>,
    value?: string
  ): PathBuilder {
    if (typeof keyOrObject === "object") {
      this.query = keyOrObject;
      return this;
    }
    if (!value) {
      throw new Error("Invalid arguments");
    }
    this.query[keyOrObject] = value;
    return this;
  }
  public build(): string {
    const fullPath = [...this.path].join("/");
    const queryString = Object.entries(this.query)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");

    const finalUrl = queryString ? `${fullPath}?${queryString}` : fullPath;

    const URL = `${this.baseUrl}/${finalUrl}`;
    return URL;
  }
  private checkQueryParams(message?: string) {
    if (Object.keys(this.query).length > 0) {
      throw new Error(message || "default checkQueryParams error");
    }
  }
}
