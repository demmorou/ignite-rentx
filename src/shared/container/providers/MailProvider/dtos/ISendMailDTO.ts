type ISendMailDTO = {
  to: string;
  subject: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables: any;
  path: string;
};

export { ISendMailDTO };
