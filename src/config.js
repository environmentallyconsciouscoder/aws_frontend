export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "live-feed-logo",
  },
  apiGateway: {
    REGION: "us-east-1",
    // URL: "https://3ld0qgj1x7.execute-api.us-east-1.amazonaws.com/dev",
    URL: "https://oqt9f6jn82.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_LYyDatvKz",
    APP_CLIENT_ID: "31ve7mhg5rpojau8glsoon6mis",
    IDENTITY_POOL_ID: "us-east-1:792a1c62-e2ae-418b-aba3-ac7a96a6318e",

    //TESTING:
    // REGION: "us-east-1",
    // USER_POOL_ID: "us-east-1_RE9ZsMXPl",
    // APP_CLIENT_ID: "2isajtmdjfp3fphk4961s9qa1m",
    // IDENTITY_POOL_ID: "us-east-1:fe85cf22-6563-499e-a734-5ae23be5b528",

  },
};
