package no.kantega.springandreact;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;

public class CreateCognitoUser {

    static String USERNAME = "narendrachauhan"; // Input an unique username for the UserPool
//     static String PHONE_NUMBER = "+919725337199"; // Input the user phone number for the user Attribute
    static String USERPOOL_ID = "us-east-1_sYONPFY4R"; // Input the UserPool Id, e.g. us-east-1_xxxxxxxx
    static String USER_TEMP_PASSWORD = "N@ren12345"; // Input the temporary password for the user
    static String USER_EMAIL = "narendrachouhan0021@gmail.com"; // Input the email for the user attribute

    public static void main(String[] args) {

        AWSCognitoIdentityProvider cognitoIdentityProvider = AWSCognitoIdentityProviderClientBuilder.defaultClient();
        System.out.println("USERPOOL_ID.............."+USERPOOL_ID);

        cognitoIdentityProvider.adminCreateUser(
                new AdminCreateUserRequest()
                        .withUserPoolId(USERPOOL_ID)
                        .withUsername(USERNAME)
                        .withTemporaryPassword(USER_TEMP_PASSWORD)
                        .withUserAttributes(
                                new AttributeType()
                                        .withName("phone_number_verified")
                                        .withValue("true"),
                                new AttributeType()
                    
                    
                    
                                .withName("email")
                                        .withValue(USER_EMAIL)));


        System.out.println("USERPOOL_ID.............."+USERPOOL_ID);
        // Validate the data created/updated in this class.
        AdminGetUserResult user = cognitoIdentityProvider.adminGetUser(
                new AdminGetUserRequest()
                        .withUserPoolId(USERPOOL_ID)
                        .withUsername(USERNAME));
        assert (user.getUsername().equals(USERNAME));
        assert (user.getEnabled());
    }
}