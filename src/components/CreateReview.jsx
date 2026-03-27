import { Text, Pressable, TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';

import * as yup from 'yup';
import theme from './theme';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

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
    },
    errorText: {
        color: '#d73a4a',
        marginTop: 4,
    }
})

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    review: ''
}


const CreateReview = () => {
    const [createReview] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const {ownerName, repositoryName, rating, review} = values;
        try {
        const {data} = await createReview({
        variables: {
            review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text: review,
            },
        },
        });
        navigate(`/${data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };

    const validationSchema = yup.object().shape({
        ownerName: yup
        .string()
        .required('Repository owner name is required.'),
        repositoryName: yup
        .string()
        .required('Repository name is required'),
        rating: yup
        .number()
        .typeError('Rating must be a number')
        .min(0, 'Rating must be at least 0')
        .max(100, 'Rating must be at most 100')
        .required('Rating is required'),
        review: yup
        .string()
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
         style={getInputStyle('ownerName')}
         placeholder='Repository owner name'
         value={formik.values.ownerName}
         onChangeText={formik.handleChange('ownerName')}
         />
         {formik.touched.ownerName && formik.errors.ownerName && (
             <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
            )}
         <TextInput
         style={getInputStyle('repositoryName')}
         placeholder='Repository name'
         value={formik.values.repositoryName}
         onChangeText={formik.handleChange('repositoryName')}
         />
         {formik.touched.repositoryName && formik.errors.repositoryName && (
             <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
            )}
         <TextInput
         style={getInputStyle('rating')}
         placeholder='Rating between 0 and 100'
         value={formik.values.rating}
         onChangeText={formik.handleChange('rating')}
         />
         {formik.touched.rating && formik.errors.rating && (
             <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}
         <TextInput
         style={getInputStyle('review')}
         placeholder='Review'
         value={formik.values.review}
         onChangeText={formik.handleChange('review')}
         multiline
         />
         {formik.touched.review && formik.errors.review && (
             <Text style={styles.errorText}>{formik.errors.review}</Text>
            )}
         <Pressable onPress={formik.handleSubmit}
               style={({ pressed }) => [
                   styles.buttonStyle,
                   pressed && styles.buttonPressed
                ]}>
             <Text style={styles.buttonTextStyle}>
                 Create a review
             </Text>
         </Pressable>
     </View>
    </>
    );
}

export default CreateReview;