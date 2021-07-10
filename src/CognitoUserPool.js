import { CognitoUserPool } from "amazon-cognito-identity-js";


var poolData = {
    UserPoolId: 'us-east-2_erVttDqS9',
    ClientId: '7cebvejfg7vji6np6faftigfcg',
};

export default new CognitoUserPool(poolData);