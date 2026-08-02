import { useAuth, useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
  Pressable,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onSignInPress = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      await signIn.mfa.sendPhoneCode();
      await signIn.mfa.sendPhoneCode();
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      console.log("Sign-in attempt not complete", signIn);
      console.log("Sign-in attempt not complete", signIn);
    }
  };

  const onVerifyPress = async () => {
    await signIn.mfa.verifyEmailCode({
      code,
    });

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  const isLoading = fetchStatus === "fetching";

  // OTP verification screen
  if (signIn.status === "needs_client_trust") {
  if (signIn.status === "needs_client_trust") {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          {/* Hero Image */}
          <Image
            source={require("../../assets/images/hero.png")}
            className="w-full"
            resizeMode="cover"
          />
        </View>
      </SafeAreaView>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          {/* Hero Image */}
          <Image
            source={require("../../assets/images/hero.png")}
            className="w-full"
            resizeMode="cover"
          />
        </View>
      </SafeAreaView>
    );
  }

  // Sign up form
  return (
    <View className="flex-1 bg-white">
      {/* Hero Section */}
      <View className="absolute inset-0">
        <Image
          source={require("../../assets/images/hero.png")}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* Floating Card */}
      <View
        className="absolute bottom-0 left-0 right-0 mx-5 mb-6 rounded-[36px] bg-[#FBF9F6] px-6 pt-8 pb-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="items-center">
            <Text
              className="text-[28px] text-[#1F1F1F]"
              style={{ fontFamily: "InriaSerif-Bold" }}
            >
              Welcome Back
            </Text>

            <Text
              className="mt-1 text-center text-[13px] text-[#4B5563]"
              style={{ fontFamily: "DMSans-Regular" }}
            >
              Login to continue to Elvora
            </Text>
          </View>

          {/* ---------------- Login Form ---------------- */}

          <View className="mt-8">
            {/* Email */}
            <View>
              <Text
                className="mb-2 text-sm font-medium text-[#374151]"
                style={{ fontFamily: "DMSans-Medium" }}
              >
                Email Address
              </Text>

              <View className="h-14 flex-row items-center rounded-2xl border border-[#E5E7EB] bg-white px-4">
                <Ionicons name="mail-outline" size={20} color="#6B7280" />

                <TextInput
                  className="ml-3 flex-1 text-[15px] text-[#111827]"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Password */}
            <View className="mt-5">
              <Text
                className="mb-2 text-sm font-medium text-[#374151]"
                style={{ fontFamily: "DMSans-Medium" }}
              >
                Password
              </Text>

              <View className="h-14 flex-row items-center rounded-2xl border border-[#E5E7EB] bg-white px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#6B7280"
                />

                <TextInput
                  className="ml-3 flex-1 text-[15px] text-[#111827]"
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="done"
                />

                <Pressable
                  hitSlop={8}
                  onPress={() => {
                    // Password visibility toggle (Next Section)
                  }}
                >
                  <Ionicons name="eye-off-outline" size={20} color="#6B7280" />
                </Pressable>
              </View>
            </View>

            {/* Forgot Password */}
            <View className="mt-3 items-end">
              <Pressable>
                {({ pressed }) => (
                  <Text
                    className={`text-sm font-medium text-[#111827] ${
                      pressed ? "opacity-60" : "opacity-100"
                    }`}
                    style={{ fontFamily: "DMSans-Medium" }}
                  >
                    Forgot Password?
                  </Text>
                )}
              </Pressable>
            </View>

            {/* ---------------------------------------------------------------- */}
            {/* Primary CTA */}
            {/* ---------------------------------------------------------------- */}
            <Pressable
              onPress={onSignInPress}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Sign In"
            >
              {({ pressed }) => (
                <View
                  className={`mt-4 h-14 flex-row items-center justify-center rounded-2xl bg-[#111111] ${
                    pressed || isLoading ? "opacity-80" : "opacity-100"
                  }`}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Text
                        className="text-[16px] font-semibold text-white"
                        style={{ fontFamily: "DMSans-SemiBold" }}
                      >
                        Sign In
                      </Text>

                      <View className="ml-2">
                        <Ionicons
                          name="arrow-forward"
                          size={18}
                          color="#FFFFFF"
                        />
                      </View>
                    </>
                  )}
                </View>
              )}
            </Pressable>

            {/* ---------------------------------------------------------------- */}
            {/* Divider */}
            {/* ---------------------------------------------------------------- */}
            <View className="mt-6 flex-row items-center">
              <View className="h-[1px] flex-1 bg-[#E5E7EB]" />

              <Text
                className="mx-4 text-[11px] uppercase tracking-[2px] text-[#9CA3AF]"
                style={{ fontFamily: "DMSans-Medium" }}
              >
                Or Continue With
              </Text>

              <View className="h-[1px] flex-1 bg-[#E5E7EB]" />
            </View>

            {/* ---------------------------------------------------------------- */}
            {/* Google Login */}
            {/* ---------------------------------------------------------------- */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={() => {
                // TODO: Google OAuth
              }}
            >
              {({ pressed }) => (
                <View
                  className={`mt-5 h-14 flex-row items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white ${
                    pressed ? "opacity-80" : "opacity-100"
                  }`}
                >
                  <Image
                    source={require("../../assets/icons/google.png")}
                    className="h-[22px] w-[22px]"
                    resizeMode="contain"
                  />

                  <Text
                    className="ml-3 text-[15px] text-[#374151]"
                    style={{ fontFamily: "DMSans-Medium" }}
                  >
                    Continue with Google
                  </Text>
                </View>
              )}
            </Pressable>

            {/* ---------------------------------------------------------------- */}
            {/* Bottom Text */}
            {/* ---------------------------------------------------------------- */}
            <View className="mt-6 flex-row items-center justify-center">
              <Text
                className="text-[14px] text-[#4B5563]"
                style={{ fontFamily: "DMSans-Regular" }}
              >
                Don't have an account?
              </Text>

              <Pressable onPress={() => router.push("/sign-up")}>
                {({ pressed }) => (
                  <Text
                    className={`ml-1 text-[14px] text-[#4B5563] ${
                      pressed ? "opacity-70" : "opacity-100"
                    }`}
                    style={{ fontFamily: "DMSans-SemiBold" }}
                  >
                    Sign Up
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

