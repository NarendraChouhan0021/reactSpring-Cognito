
package no.kantega.springandreact;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminCreateUserRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminCreateUserResponse;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;

public class CreateAdminUser {

        public static void main(String[] args) {
                final String USAGE = "\n" + "Usage:\n" + "    CreateAdminUser <user_pool_id> <username> <email>\n\n"
                                + "Where:\n"
                                + "    user_pool_id - The user pool ID for the user pool where the user will be created.\n\n"
                                + "    username - The username for the user.\n\n"
                                + "    email  - The email to user for verifying admin account.\n\n" + "Example:\n"
                                + "    CreateTable HelloTable\n";

                if (args.length < 3) {
                        System.out.println(USAGE);
                        System.exit(1);
                }

                // snippet-start:[cognito.java2.add_login_provider.main]
                /* Read the name from command args */
                String user_pool_id = "5f44ic3nikn0eo1aune57eg3lk";
                String name = args[1];
                String email = args[2];

                CognitoIdentityProviderClient cognitoclient = CognitoIdentityProviderClient.builder()
                                .region(Region.US_EAST_1).build();

                AdminCreateUserResponse response = cognitoclient.adminCreateUser(AdminCreateUserRequest.builder()
                                .userPoolId(user_pool_id).username(name)
                                .userAttributes(AttributeType.builder().name("email").value(email).build())
                                .messageAction("SURPRESS").build());

                System.out.println("User " + response.user().username() + "is created. Status: "
                                + response.user().userStatus());
        }
}
