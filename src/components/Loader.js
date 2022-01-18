import { styled } from '@mui/material';

const Loader = styled('div')(({ theme }) => ({
	'@keyframes spin': {
		from: {
			transform: 'rotate(0deg)',
		},
		to: {
			transform: 'rotate(360deg)',
		},
	},

	border: '10px solid rgba(0,0,0,0.15)',
	borderTop: '10px solid',
	borderTopColor: theme.palette.primary.main,
	borderRadius: '50%',
	width: '60px',
	height: '60px',
	animation: 'spin 1s linear infinite',
	margin: 'auto',
}));

export default Loader;
