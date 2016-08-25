export class CoDataModelError extends Error {

  constructor(public message:string) {
    super(message);
  }
}

export class CoDataServiceError extends Error {

  constructor(public message:string) {
    super(message);
  }
}

export class CaUriError extends Error {

  constructor(public message:string) {
    super(message);
  }
}
