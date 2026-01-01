import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Avatar,
    Chip,
    InputAdornment,
    AppBar,
    Toolbar,
    Paper,
    Fade,
    Zoom
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Business as BusinessIcon,
    Search as SearchIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
    Save as SaveIcon,
    Contacts as ContactsIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

// Import your local images
import image1 from '../assets/shantesh.jpg';
import image2 from '../assets/men.jpg';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpeg';

const AVATAR_IMAGES = [image1, image2, image3, image4, image5];

const theme = createTheme({
    palette: {
        primary: { main: '#2196f3', light: '#64b5f6', dark: '#1976d2' },
        secondary: { main: '#673ab7', light: '#9575cd', dark: '#512da8' },
        background: { default: '#f5f7fa', paper: '#ffffff' },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 },
        h6: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    shadows: ['none', '0px 2px 4px rgba(0,0,0,0.1)', '0px 4px 8px rgba(0,0,0,0.12)', '0px 8px 16px rgba(0,0,0,0.15)', '0px 12px 24px rgba(0,0,0,0.18)'],
});

export default function Contact() {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'Shantesh Saman',
            email: 'shanteshsaman2004@gmail.com',
            phone: '8208344322',
            address: 'Wakad, Pimpri-Chinchwad, Pune',
            company: 'NA'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 8901',
            address: '456 Oak Ave, Los Angeles, CA',
            company: 'Design Studio'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    // Validation Functions
    const validateName = (name) => !name.trim() ? 'Full name is required' : '';
    const validateEmail = (email) => {
        if (!email) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? '' : 'Please enter a valid email (e.g. name@example.com)';
    };
    const validatePhone = (phone) => {
        if (!phone) return 'Phone number is required';
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length === 10 ? '' : 'Phone must have exactly 10 digits';
    };

    const handleSubmit = () => {
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);

        setErrors({ name: nameError, email: emailError, phone: phoneError });

        if (nameError || emailError || phoneError) {
            toast.error("Please check the highlighted fields and correct the errors");
            return;
        }

        if (editingId) {
            setContacts(prev => prev.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
            Swal.fire({ icon: "success", title: "Updated!", text: "Contact updated successfully" });
        } else {
            setContacts(prev => {
                const newId = prev.length > 0 ? Math.max(...prev.map(c => c.id)) + 1 : 1;
                return [...prev, { ...formData, id: newId }];
            });
            Swal.fire({ icon: "success", title: "Added!", text: "Contact added successfully" });
        }

        closeModal();
    };

    const handleEdit = (contact) => {
        setFormData(contact);
        setEditingId(contact.id);
        setIsModalOpen(true);
        setErrors({ name: '', email: '', phone: '' });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d32f2f",
            cancelButtonColor: "#1976d2",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setContacts(prev => prev.filter(contact => contact.id !== id));
                Swal.fire({ title: "Deleted!", text: "Contact has been deleted.", icon: "success", timer: 1500, showConfirmButton: false });
            }
        });
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', email: '', phone: '', address: '', company: '' });
        setErrors({ name: '', email: '', phone: '' });
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        (contact.company || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
                <AppBar position="static" elevation={2} sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <Toolbar sx={{ py: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2, width: 56, height: 56 }}>
                            <ContactsIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 700 }}>
                                Contact Manager
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
                                Manage your contacts efficiently
                            </Typography>
                        </Box>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={openModal}
                            sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 600, px: 3, py: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)', transform: 'scale(1.05)' }, transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                            Add Contact
                        </Button>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
                        <TextField fullWidth variant="outlined" placeholder="Search contacts by name, email, phone, or company..."
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment> }}
                        />
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Chip label={`Total Contacts: ${contacts.length}`} color="primary" sx={{ fontWeight: 600, mr: 2 }} />
                            {searchTerm && <Chip label={`Showing: ${filteredContacts.length}`} color="secondary" sx={{ fontWeight: 600 }} />}
                        </Box>
                    </Paper>

                    {filteredContacts.length === 0 ? (
                        <Fade in={true}>
                            <Paper elevation={2} sx={{ p: 8, textAlign: 'center', borderRadius: 3 }}>
                                <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'grey.200' }}>
                                    <PersonIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                                </Avatar>
                                <Typography variant="h6" color="text.secondary" gutterBottom>No contacts found</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first contact'}
                                </Typography>
                            </Paper>
                        </Fade>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredContacts.map((contact, index) => (
                                <Grid item xs={12} sm={6} md={4} key={contact.id}>
                                    <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                                        <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' } }}>
                                            <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', height: 100, position: 'relative' }}>
                                                <Avatar
                                                    src={AVATAR_IMAGES[(contact.id - 1) % AVATAR_IMAGES.length]}
                                                    alt={contact.name}
                                                    sx={{ width: 70, height: 70, position: 'absolute', bottom: -35, left: 24, border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                                                />
                                            </Box>

                                            <CardContent sx={{ pt: 5, flexGrow: 1 }}>
                                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>{contact.name}</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                    <EmailIcon sx={{ fontSize: 18, color: 'primary.main', mr: 1.5 }} />
                                                    <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>{contact.email}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                    <PhoneIcon sx={{ fontSize: 18, color: 'success.main', mr: 1.5 }} />
                                                    <Typography variant="body2" color="text.secondary">{contact.phone}</Typography>
                                                </Box>
                                                {contact.address && (
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                                                        <LocationIcon sx={{ fontSize: 18, color: 'error.main', mr: 1.5, mt: 0.2 }} />
                                                        <Typography variant="body2" color="text.secondary">{contact.address}</Typography>
                                                    </Box>
                                                )}
                                                {contact.company && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <BusinessIcon sx={{ fontSize: 18, color: 'secondary.main', mr: 1.5 }} />
                                                        <Typography variant="body2" color="text.secondary">{contact.company}</Typography>
                                                    </Box>
                                                )}
                                            </CardContent>

                                            <CardActions sx={{ p: 2, pt: 0 }}>
                                                <Button fullWidth variant="outlined" startIcon={<EditIcon />} onClick={() => handleEdit(contact)} sx={{ mr: 1, fontWeight: 600 }}>Edit</Button>
                                                <Button fullWidth variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(contact.id)} sx={{ fontWeight: 600 }}>Delete</Button>
                                            </CardActions>
                                        </Card>
                                    </Zoom>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>

                {/* Modal */}
                <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
                    <DialogTitle sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{editingId ? 'Edit Contact' : 'Add New Contact'}</Typography>
                        <IconButton onClick={closeModal} sx={{ color: 'white' }}><CloseIcon /></IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ pt: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required variant="outlined"
                                error={!!errors.name} helperText={errors.name} />

                            <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required variant="outlined"
                                error={!!errors.email} helperText={errors.email || "e.g. john@gmail.com"} />

                            <TextField fullWidth label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required variant="outlined"
                                error={!!errors.phone} helperText={errors.phone || "Exactly 10 digits"}
                                onKeyDown={(e) => {
                                    const allowed = ['0','1','2','3','4','5','6','7','8','9','+','-','(',' ',')','Backspace','Delete','ArrowLeft','ArrowRight','Tab'];
                                    if (!allowed.includes(e.key)) e.preventDefault();
                                    if (e.key === '+' && formData.phone.includes('+')) e.preventDefault();
                                }} />

                            <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} variant="outlined" />
                            <TextField fullWidth label="Company" name="company" value={formData.company} onChange={handleInputChange} variant="outlined" />
                        </Box>
                    </DialogContent>

                    <DialogActions sx={{ p: 3, pt: 2 }}>
                        <Button onClick={closeModal} variant="outlined" sx={{ px: 3, fontWeight: 600 }}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" startIcon={<SaveIcon />}
                            sx={{ px: 3, fontWeight: 600, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            {editingId ? 'Update' : 'Save'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}