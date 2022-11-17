import React from "react";
import { auth } from "../../firebase/Firebase";
import {
    StyleSheet,
    Dimensions,
    View,
    ImageBackground,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

const LogIN = ({ navigation }) => {
    const [email, setemail] = React.useState("");
    const [name, setname] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isValidEmail, setIsValidEmail] = React.useState(false);
    const [PhoneNumber, setPhoneNumber] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [isValidUserName, setisValidUserName] = React.useState(false);
    const [isValidPhoneNumber, setisValidPhoneNumber] = React.useState(false);
    const [secureTextEntry, setsecureTextEntry] = React.useState(false);

    const handleSignUp = () => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                console.log(user);

                // ...
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(errorCode);
                setLoading(false);

                setTimeout(() => {
                    setError("");
                }, 4000);

                // ..
            });
    };
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {

                navigation.navigate("Home");
            }

        });
        return unsubscribe;
    }, []);


    return (
        <KeyboardAvoidingView behavior="height" style={styles.container}>
            <View style={styles.container}>
                <Animatable.View
                    style={styles.header}
                    animation="pulse"
                    iterationCount="infinite"
                    direction="alternate"
                >
                    <ImageBackground
                        style={styles.background}
                        source={require("../../assets/images/login.png")}
                    ></ImageBackground>
                </Animatable.View>

                <Animatable.View style={styles.footer} animation="fadeInUpBig">
                    <Animatable.View
                        animation="pulse"
                        iterationCount="infinite"
                        direction="alternate"
                    >
                        {error ? (
                            <Text
                                style={{
                                    color: "red",
                                    textAlign: "center",
                                    marginTop: 20,
                                    fontSize: 20,
                                }}
                            >
                                {error}
                            </Text>
                        ) : null}
                    </Animatable.View>
                    <Text style={styles.titleText}>Log in</Text>

                    <View style={[styles.action, { marginTop: 20 }]}>
                        <FontAwesome name="user-o" color="#EAB308" size={20} />
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            onChangeText={text => setemail(text)}
                            value={email}
                            placeholderTextColor="#fff"
                        />
                    </View>

                    <View style={[styles.action, { marginTop: 20 }]}>
                        <FontAwesome name="lock" color="#EAB308" size={20} />

                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={styles.textInput}
                            placeholderTextColor="#fff"
                            onChangeText={password => setPassword(password)}
                            value={password}
                        />

                        <Animatable.View animation="bounceIn">
                            <TouchableOpacity onPress={() => setPassword()}>
                                {secureTextEntry ? (
                                    <FontAwesome name="eye-slash" color="#fff" size={18} />
                                ) : (
                                    <FontAwesome name="eye" color="#fff" size={18} />
                                )}
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.button_signUp}
                            onPress={handleSignUp}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.btnTextSignUp}>Sign Up</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: "#fff",
                                textAlign: "center",
                                marginTop: 20,
                                fontSize: 16,
                            }}
                        >
                            not a member?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Sing")}
                            style={{
                                marginTop: 10,
                                backgroundColor: "#EAB308",
                                padding: 10,
                                borderRadius: 10,
                                width: 150,
                                alignSelf: "center",
                            }}
                        >
                            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </KeyboardAvoidingView>
    );
};
const image_width = Dimensions.get("window").width;
const image_height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 0.80,
        backgroundColor: "#000",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    background: {

        width: image_width,
        justifyContent: "center",
        alignItems: "center",

        height: image_height / 2,
    },
    titleText: {
        alignContent: "center",
        alignItems: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: 30,
    },
    action: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EAB308",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: "#EAB308",
    },
    button: {
        alignItems: "center",
        marginTop: 30,
    },
    button_signUp: {
        backgroundColor: "#EAB308",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        width: image_width - 50,
        height: 50,
    },
    btnTextSignUp: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});
export default LogIN