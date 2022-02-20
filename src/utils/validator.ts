export class Validator {
  static isValidUUID(id: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );
  }

  static isValidEmail(email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  static Password = class {
    static hasMinLength(pass: string): boolean {
      return pass.length >= 8;
    }

    static hasOneLowercaseLetter(pass: string): boolean {
      return pass.search(/[a-z]/) > 0;
    }

    static hasOneUppercaseLetter(pass: string): boolean {
      return pass.search(/[A-Z]/) > 0;
    }

    static hasOneDigit(pass: string): boolean {
      return pass.search(/[0-9]/) > 0;
    }
  };
}
