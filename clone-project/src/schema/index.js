import * as Yup from 'yup';

export const formSchema = Yup.object({
    username: Yup.string().required('Please enter your Username').min(4),
    email:Yup.string().required('Enter your Email ID').email(),
    message:Yup.string().required('Feedback is a required').min(10),
})