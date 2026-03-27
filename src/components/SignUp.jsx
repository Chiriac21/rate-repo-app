import { Text, Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
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
    password: '',
    confirmationPass: ''
}

export const SignUpContainer = ({onSubmit}) => {

    const validationSchema = yup.object().shape({
        username: yup
        .string()
        .min(5, 'Username must be at least 5 characters long')
        .max(30, 'Username must be at most 30 characters long')
        .required('Username is required.'),
        password: yup
        .string()
        .min(5, 'Password must be at least 5 characters long')
        .max(50, 'Password must be at most 50 characters long')
        .required('Password is required'),
        confirmationPass: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const getInputStyle = (field) => [
    styles.textInputStyle,
        {
        borderColor:
        formik.touched[field] && formik.errors[field]
            ? '#d73a4a'
            : '#8a939e',
        },
    ];

return (
    <>
      <View style={styles.formStyle}>
          <TextInput
          style={getInputStyle('username')}
          placeholder='Username'
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          />
          {formik.touched.username && formik.errors.username && (
              <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
          )}
          <TextInput
          style={getInputStyle('password')}
          placeholder='Password'
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          />
          {formik.touched.password && formik.errors.password && (
              <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
          )}
          <TextInput
          style={getInputStyle('confirmationPass')}
          placeholder='Password confirmation'
          secureTextEntry
          value={formik.values.confirmationPass}
          onChangeText={formik.handleChange('confirmationPass')}
          />
          {formik.touched.confirmationPass && formik.errors.confirmationPass && (
              <Text style={{ color: 'red' }}>{formik.errors.confirmationPass}</Text>
          )}
          <Pressable onPress={formik.handleSubmit}
                style={({ pressed }) => [
                  styles.buttonStyle,
                  pressed && styles.buttonPressed
              ]}>
              <Text style={styles.buttonTextStyle}>
                  Sign up
              </Text>
          </Pressable>
      </View>
    </>
  );
}

const SignUp = () => {
    const [createUser] = useMutation(CREATE_USER)
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const {username, password, confirmationPass} = values;
        try {
            const { userData } = await createUser({
            variables: {
                user: {
                username,
                password,
                },
            },
            });
            
            const { data } = await signIn({ username, password });
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };


  return <SignUpContainer onSubmit={onSubmit}/>
};

export default SignUp;