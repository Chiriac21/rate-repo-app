import { Text, Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import theme from './theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
    formStyle:{
        flex: 1,
        margin: 20,
    },
    textInputStyle:{
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#8a939e',
        padding: 15,
        marginTop: 10,
        borderRadius: 5
    },
    buttonStyle:{
        backgroundColor: theme.colors.primary,
        padding : 15,
        borderRadius: 5,
        marginTop: 10
    },
    buttonPressed:{
        backgroundColor: '#014ba0'
    },
    buttonTextStyle: {
        color: theme.colors.textPrimary,
        textAlign: 'center',
        fontWeight: theme.fontWeights.bold,
    }
})

const initialValues = {
    username: '',
    password: ''
}

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const {username, password} = values;

        if(!formik.errors.username && !formik.errors.password)
            try {
            const { data } = await signIn({ username, password });
            console.log(data);
            navigate('/');
            } catch (e) {
            console.log(e);
            }

    };

    const validationSchema = yup.object().shape({
        username: yup
        .string()
        .required('Username is required.'),
        password: yup
        .string()
        .required('Password is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const usernameStyle = [
     styles.textInputStyle,
     {borderColor: formik.errors.username ? '#d73a4a' :'#8a939e'}
    ]

    const passwordStyle = [
     styles.textInputStyle,
     {borderColor: formik.errors.password ? '#d73a4a' :'#8a939e'}
    ]

  return (
    <>
        <View style={styles.formStyle}>
            <TextInput
            style={usernameStyle}
            placeholder='Username'
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}
            <TextInput
            style={passwordStyle}
            placeholder='Password'
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
            )}
            <Pressable onPress={formik.handleSubmit}
                  style={({ pressed }) => [
                    styles.buttonStyle,
                    pressed && styles.buttonPressed
                ]}>
                <Text style={styles.buttonTextStyle}>
                    Sign In
                </Text>
            </Pressable>
        </View>
    </>
  );
};

export default SignIn;