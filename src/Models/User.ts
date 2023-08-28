export interface IUserInfo {
  id: {
    value: string;
  };
  name: {
    title?: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
  };

  picture: {
    large: string;
  };
}
