import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ColorPicker } from 'primereact/colorpicker';
import { Editor } from 'primereact/editor';
import { color } from '@mui/system';
import { fetchCategories } from '../Functions/functions';
import axios from 'axios';



export default function CreateBusiness() {


    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);


    const [formData, setFormData] = useState({
        businessName: '',
        logo: '',
        ownerName: '',
        email: '',
        password: '',
        address: {
            buildingName: '',
            streetName: '',
            landMark: '',
            city: '',
            state: '',
            pinCode: ''
        },
        location:{
            lat:'',
            lon:'',

        },
        contactDetails: {},
        socialMediaLinks: [
            { tag: 'facebook', link: '' },
            { tag: 'instagram', link: '' },
            { tag: 'twitter', link: '' }
        ],
        category: '',
        services: [],
        businessTiming: {
            workingDays: [],
            openTime: {
                open: '',
                close: ''
            }
        },
        description: '',
        theme: '',
        landingPageHero: {
            title: '',
            description: '',
            coverImage: ''
        },
        welcomePart: {
            title: '',
            description: '',
            coverImage: ''
        },
        specialServices: {
            title: '',
            description: '',
            data: []
        },
        productSection: [],
        service: [],
        testimonial: {
            description: '',
            reviews: []
        },
        gallery: [],
        seoData: {
            title: '',
            description: '',
            metaTags: []
        },
        selectedPlan: ''
    });








    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryDetails = await fetchCategories();
                setCategoryData(categoryDetails.data.data);
                console.log(categoryDetails.data.data)
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);










    function BusinessDetails() {

        const [logo, setLogo] = useState('')

        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
            console.log(formData)
        };

        const handleAddressChange = (event) => {
            const { name, value } = event.target;
            setFormData(prevFormData => ({
                ...prevFormData,
                address: {
                    ...prevFormData.address,
                    [name]: value,
                },
            }));
        };

        const handleLogoChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        logo: file.name, 
                    }));
                    setLogo(e.target.result); 
                };
                reader.readAsDataURL(file);
            }
        };

        const imageUpload = () => {
            document.getElementById('ImageLogo').click();
        };


        const handleLocationChange = (event) => {
            const { name, value } = event.target;
            setFormData(prevFormData => ({
                ...prevFormData,
                location: {
                    ...prevFormData.location,
                    [name]: value,
                },
            }));           
        }


        return (
            <>
                <div className='h-100vh'>
                    <div className="row justify-content-center h-100">
                        <div className="d-none d-md-block left-portion p-0 col-5 h-100">
                            <img src="/src/assets/images/business-details.jpg" alt="" className='w-100 h-100' />
                        </div>
                        <div className="col-12 col-md-7 row align-items-center right-portion p-5">
                            <div>
                                <div className="col-12">
                                    <h1 className='fw-bold text-center text-md-start'>
                                        Enter your <br /> Business Details
                                    </h1>
                                </div>
                                <div className="col-12 mt-3">
                                    <input
                                        type="text"
                                        placeholder="Business Name"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        className="form-control form-control-lg"
                                    />

                                    <input
                                        type="file"
                                        id="ImageLogo"
                                        style={{ display: 'none' }}
                                        onChange={handleLogoChange}
                                    />

                                    {/* Clickable div for triggering file input */}
                                    <div onClick={imageUpload} className="p-2 mt-2 add-logo-div" id="businessMainDiv">
                                        {logo ? (
                                            <img src={logo} alt="Business Logo" width="100" />
                                        ) : (
                                            <div className="text-center" id="addImageDiv">
                                                <img src="/src/assets/images/add_image.png" width="50" alt="Add Logo" />
                                                <div className="col-12">
                                                    <span>Add Logo</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Building Name"
                                        name="buildingName"
                                        value={formData.address.buildingName}
                                        onChange={handleAddressChange}
                                        className="form-control form-control-lg mt-3"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Street / Colony Name"
                                        name="streetName"
                                        value={formData.address.streetName}
                                        onChange={handleAddressChange}
                                        className="form-control form-control-lg mt-3"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Landmark"
                                        name="landMark"
                                        value={formData.address.landMark}
                                        onChange={handleAddressChange}
                                        className="form-control form-control-lg mt-3"
                                    />
                                    <div className="row">
                                        <div className="col-12 col-md-6 mt-3">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg w-100"
                                                name="state"
                                                value={formData.address.state}
                                                onChange={handleAddressChange}
                                                placeholder="State"
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mt-3">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg w-100"
                                                name="pinCode"
                                                value={formData.address.pinCode}
                                                onChange={handleAddressChange}
                                                placeholder="Pincode"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6 mt-3">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg w-100"
                                                name="lat"
                                                value={formData.location.lat}
                                                onChange={handleLocationChange}
                                                placeholder="Location Lat"
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mt-3">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg w-100"
                                                name="lon"
                                                value={formData.location.lon}
                                                onChange={handleLocationChange}
                                                placeholder="Location Lon"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <button className="btn btn-theme2 w-100" onClick={handleNextStep}>
                                            Save & Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    function ContactDetails() {
        const [mobileNumbers, setMobileNumbers] = useState([{ id: 1, number: '' }]);
        const [whatsappNumbers, setWhatsappNumbers] = useState([{ id: 1, number: '' }]);
        const [emails, setEmails] = useState([{ id: 1, email: '' }]);
        
        const [newFormData, setNewFormData] = useState({
            contactDetails: {
                name: '',
                mobileNumbers: [],
                whatsappNumbers: [],
                emails: [],
                website: ''
            }
        });
    
        const handleContactChange = (event) => {
            const { name, value } = event.target;
            
            setNewFormData(prevData => ({
                ...prevData,
                contactDetails: {
                    ...prevData.contactDetails,
                    [name]: value,
                }
            }));
        };
    
        const handleMobileNumberChange = (id, value) => {
            const updatedMobileNumbers = mobileNumbers.map(number => 
                number.id === id ? { ...number, number: value } : number
            );
    
            setMobileNumbers(updatedMobileNumbers);
            
            // Update formData with new mobile numbers
            setNewFormData(prevFormData => {
                const newFormValue = {
                    ...prevFormData,
                    contactDetails: {
                        ...prevFormData.contactDetails,
                        mobileNumbers: updatedMobileNumbers.map(number => number.number)
                    }
                };
                console.log(newFormData.contactDetails); // Log updated formData
                return newFormValue;
            });
        };
    
        const handleWhatsappNumberChange = (id, value) => {
            const updatedWhatsappNumbers = whatsappNumbers.map(number => 
                number.id === id ? { ...number, number: value } : number
            );
    
            setWhatsappNumbers(updatedWhatsappNumbers);
    
            // Update formData with new WhatsApp numbers
            setNewFormData(prevFormData => {
                const newFormvalue = {
                    ...prevFormData,
                    contactDetails: {
                        ...prevFormData.contactDetails,
                        whatsappNumbers: updatedWhatsappNumbers.map(number => number.number)
                    }
                };
                console.log(newFormvalue); // Log updated formData
                return newFormvalue;
            });
        };
    
        const handleEmailChange = (id, value) => {
            const updatedEmails = emails.map(email => 
                email.id === id ? { ...email, email: value } : email
            );
    
            setEmails(updatedEmails);
    
            // Update formData with new emails
            setNewFormData(prevFormData => {
                const newFormvalue = {
                    ...prevFormData,
                    contactDetails: {
                        ...prevFormData.contactDetails,
                        emails: updatedEmails.map(email => email.email)
                    }
                };
                console.log(newFormvalue); // Log updated formData
                return newFormvalue;
            });
        };
    
        const addMobileNumber = () => {
            setMobileNumbers([...mobileNumbers, { id: mobileNumbers.length + 1, number: '' }]);
        };
    
        const removeMobileNumber = (id) => {
            setMobileNumbers(mobileNumbers.filter(number => number.id !== id));
        };
    
        const addWhatsappNumber = () => {
            setWhatsappNumbers([...whatsappNumbers, { id: whatsappNumbers.length + 1, number: '' }]);
        };
    
        const removeWhatsappNumber = (id) => {
            setWhatsappNumbers(whatsappNumbers.filter(number => number.id !== id));
        };
    
        const addEmail = () => {
            setEmails([...emails, { id: emails.length + 1, email: '' }]);
        };
    
        const removeEmail = (id) => {
            setEmails(emails.filter(email => email.id !== id));
        };

        const contactSubmitHandler = () => {
            console.log("Submitting Contact Details:", newFormData); // Log before updating global state
        
            setFormData(prevData => ({
                ...prevData,
                contactDetails: newFormData.contactDetails, // Ensure you are only updating the contactDetails part
            }));
        
            handleNextStep(); // Ensure this function is defined
        };
    
        return (
            <div className='h-100vh'>
                <div className="row h-100">
                    <div className="d-none d-md-block left-portion p-0 col-5">
                        <img src="/src/assets/images/contact-details.jpg" alt="" className='w-100 h-100' />
                    </div>
                    <div className="col-12 col-md-7 row align-items-center right-portion p-5">
                        <div>
                            <div className="col-12">
                                <h1 className="fw-bold text-center text-md-start mb-2">Add <br /> Contact Details</h1>
                            </div>
                            <div className="col-12 p-5 p-sm-0 mt-3">
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Name" 
                                    onChange={handleContactChange} 
                                    className="form-control form-control-lg" 
                                />
    
                                {/* Mobile Number Section */}
                                <div id="mobileNumberDiv">
                                    {mobileNumbers.map((number) => (
                                        <div className="row mt-3" key={number.id}>
                                            <div className="col-12 col-sm-3 col-md-2">
                                                <PhoneInput
                                                    country={'us'}
                                                    enableSearch={true}
                                                    onChange={phone => handleMobileNumberChange(number.id, phone)}
                                                    containerStyle={{ width: '100%' }}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-7 col-md-8 mt-2 mt-sm-0">
                                                <input 
                                                    type="text" 
                                                    value={mobileNumbers[number.id - 1]?.number || ''} 
                                                    onChange={(e) => handleMobileNumberChange(number.id, e.target.value)} 
                                                    className="form-control form-control-lg w-100" 
                                                    placeholder="Phone Number" 
                                                />
                                            </div>
                                            {number.id > 1 && (
                                                <div className="col-12 col-sm-2 mt-2 mt-sm-0">
                                                    <button className="btn btn-danger btn-sm w-100" onClick={() => removeMobileNumber(number.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <a href="#" onClick={addMobileNumber} className="text-primary mt-2">+ Add another mobile number</a>
    
                                {/* WhatsApp Number Section */}
                                <div id="whatsappNumberDiv" className="mt-4">
                                    {whatsappNumbers.map((number) => (
                                        <div className="row mt-3" key={number.id}>
                                            <div className="col-12 col-sm-3 col-md-2">
                                                <PhoneInput
                                                    country={'us'}
                                                    enableSearch={true}
                                                    onChange={phone => handleWhatsappNumberChange(number.id, phone)}
                                                    containerStyle={{ width: '100%' }}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-7 col-md-8 mt-2 mt-sm-0">
                                                <input 
                                                    type="text" 
                                                    value={whatsappNumbers[number.id - 1]?.number || ''} 
                                                    onChange={(e) => handleWhatsappNumberChange(number.id, e.target.value)} 
                                                    className="form-control form-control-lg w-100" 
                                                    placeholder="WhatsApp Number" 
                                                />
                                            </div>
                                            {number.id > 1 && (
                                                <div className="col-12 col-sm-2 mt-2 mt-sm-0">
                                                    <button className="btn btn-danger btn-sm w-100" onClick={() => removeWhatsappNumber(number.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <a href="#" onClick={addWhatsappNumber} className="text-primary mt-2">+ Add another WhatsApp number</a>
    
                                {/* Email Section */}
                                <div id="emailDiv" className="mt-4">
                                    {emails.map((email) => (
                                        <div className="row mt-3" key={email.id}>
                                            <div className="col-12 col-md-10">
                                                <input 
                                                    type="email" 
                                                    value={emails[email.id - 1]?.email || ''} 
                                                    onChange={(e) => handleEmailChange(email.id, e.target.value)} 
                                                    className="form-control form-control-lg w-100" 
                                                    placeholder="Email" 
                                                />
                                            </div>
                                            {email.id > 1 && (
                                                <div className="col-12 col-md-2 mt-2 mt-sm-0">
                                                    <button className="btn btn-danger btn-sm w-100" onClick={() => removeEmail(email.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <a href="#" onClick={addEmail} className="text-primary mt-2">+ Add another email</a>
    
                                <div className="mt-4">
                                    <input 
                                        type="text" 
                                        name="website" 
                                        placeholder="Website" 
                                        onChange={handleContactChange} 
                                        className="form-control form-control-lg" 
                                    />
                                </div>
    
                                <div className="text-center mt-5">
                                    <button className="btn btn-theme2 w-100" onClick={contactSubmitHandler}>
                                        Save & Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    

    function CatgoryDetails() {
        const handleCategoryChange = (event, value) => {
            setFormData({
                ...formData,
                category: value ? value._id : ''
            });
        };
        
        return (
            <>
                <div className="h-100vh">
                    <div className="row h-100 justify-content-center">
                        {/* Left Image Section (hidden on small screens, visible on medium and larger screens) */}
                        <div className="d-none d-md-block left-portion col-md-5 h-100 p-0">
                            <img src="/src/assets/images/add_category.jpg" alt="" className="w-100 h-100 object-fit-cover" />
                        </div>

                        {/* Right Form Section */}
                        <div className="col-12 col-md-7 d-flex flex-column justify-content-between align-items-center right-portion h-100 p-5">
                            <div className="col-12">
                                <h1 className="fw-bold text-center text-md-start">Add <br /> Business Category</h1>
                            </div>

                            {/* Input Group Section */}
                            <div className="input-group mt-4 w-100 align-items-center">
                                {/* Search Icon */}
                                <span className="input-group-text bg-white p-3" style={{ flexBasis: '50px' }}>
                                    <i className="bi bi-search"></i>
                                </span>

                                {/* Autocomplete Input */}
                                <div style={{ flexGrow: 1, position: 'relative' }}>
                                    {loading ? (
                                        // Show CircularProgress when loading
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <CircularProgress size={24} />
                                        </div>
                                    ) : (
                                        <Autocomplete
                                            disablePortal
                                            options={categoryData}
                                            getOptionLabel={(option) => option.name} // Display category name
                                            isOptionEqualToValue={(option, value) => option._id === value._id} // Compare based on _id
                                            renderInput={(params) => <TextField {...params} label="Categories" />}
                                            onChange={handleCategoryChange} // Update category in formData
                                            name='category'
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Empty div for potential additional content */}
                            <div className="col-12 mt-5"></div>

                            {/* Save & Next Button */}
                            <div className="col-12 text-center mt-5">
                                <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleNextStep}>Save & Next</button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }



    
    function ServicesOffering() {
        const [services, setServices] = useState([]);
        const [inputService, setInputService] = useState('');
        console.log(formData)
        // Add service to formData.services
        const addService = (e) => {
            e.preventDefault();
            if (inputService.trim() !== '') {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    services: [...prevFormData.services, inputService]
                }));
                setInputService(''); // Clear input field
            }
        };

        // Delete service from formData.services
        const deleteService = (indexToDelete) => {
            setFormData(prevFormData => ({
                ...prevFormData,
                services: prevFormData.services.filter((service, index) => index !== indexToDelete)
            }));
        };

        return (
            <>
                <div className="h-100vh">
                    <div className="row h-100 justify-content-center">
                        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                            <img src="/src/assets/images/service_offering.jpg" alt="" className="w-100 h-100" />
                        </div>
                        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                            <div className="row justify-content-center ">
                                <div className="col-12 text-center">
                                    <h1 className="fw-bold">
                                        Add <br /> Service and Offering
                                    </h1>
                                </div>
                                <div className="col-12 col-md-10 mt-4 mt-md-5">
                                    <div className="input-group">
                                        <div className="col-1 brl-none br-none d-flex align-items-center justify-content-center">
                                            <span className="input-group-text bg-white br-0" style={{ padding: '11px' }}>
                                                <i className="bi bi-bag-plus"></i>
                                            </span>
                                        </div>
                                        <div className="col-8 col-md-9 bl-none br-0">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg w-100 bl-none br-0"
                                                onChange={(e) => setInputService(e.target.value)}
                                                value={inputService}
                                                placeholder="Add Service and Offering"
                                            />
                                        </div>
                                        <div className="col-3 col-md-2">
                                            <button
                                                className="btn w-100 btn-success brl-none br-0"
                                                style={{ padding: '11px' }}
                                                onClick={addService}
                                                disabled={inputService.trim() === ''}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <div className="row gap-2 justify-content-center">
                                            {formData.services.map((service, index) => (
                                                <div key={index} className="mt-2 text-center services-list p-2">
                                                    {service}
                                                    <span
                                                        className="ms-2 cursor-pointer"
                                                        onClick={() => deleteService(index)}
                                                    >
                                                        <i className="bi bi-x text-white"></i> {/* Delete icon */}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-center mt-5 p-3 p-md-5">
                                <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleNextStep}>
                                    Save & Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }


    function BusinessTiming() {
        const [days, setDays] = useState([])
        const [openTime, setOpenTime] = useState('');
        const [closeTime, setCloseTime] = useState('');
        console.log(formData)

        const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const toggleDay = (day) => {
            if (days.includes(day)) {
                setDays(days.filter(d => d !== day));
            } else {
                setDays([...days, day]);
            }
        };

        const handleSelectAll = (e) => {
            if (e.target.checked) {
                setDays(allDays);
            } else {
                setDays([]);
            }
        };

        const handleOpenTimeChange = (e) => {
            setOpenTime(e.target.value);
        };

        const handleCloseTimeChange = (e) => {
            setCloseTime(e.target.value);
        };

        const handleSubmit = () => {
            setFormData(prevFormData => ({
                ...prevFormData,
                businessTiming: {
                    workingDays: days,
                    openTime: {
                        open: openTime,
                        close: closeTime
                    }
                }
            }));
            console.log(formData); // To verify the updated formData
            handleNextStep()
        };

        return (
            <>
                <div className='h-100vh'>
                    <div className="row  h-100 justify-content-center">
                        {/* Left Image Section */}
                        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                            <img src="/src/assets/images/timing.jpg" alt="" className='w-100 h-100' />
                        </div>

                        {/* Right Form Section */}
                        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                            <div className='row  justify-content-center'>
                                <div className='col-12 text-center'>
                                    <h1 className='fw-bold'>Add <br /> Business Timing</h1>
                                </div>

                                {/* Working Days Selection */}
                                <div className="col-12 col-md-10 p-4 p-md-5">
                                    <h4 className='text-center text-md-start'>Select Working Days</h4>
                                    <div className="row gap-2 gap-md-3 justify-content-center mt-3">
                                        {allDays.map((day) => (
                                            <div
                                                key={day}
                                                className={`day-div ${days.includes(day) ? 'active' : ''} p-2 text-center cursor-pointer`}
                                                style={{ width: '60px', borderRadius: '8px', background: days.includes(day) ? '#5cb85c' : '#f0f0f0' }}
                                                onClick={() => toggleDay(day)}
                                            >
                                                <span>{day}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Select All Checkbox */}
                                    <div className="mt-5 text-center">
                                        <input
                                            type="checkbox"
                                            id="selectAllDays"
                                            className='form-check-input'
                                            onChange={handleSelectAll}
                                            checked={days.length === allDays.length}
                                        />
                                        <label className="form-check-label ms-2 text-theme2 fs-14" htmlFor="selectAllDays">
                                            Select All Days
                                        </label>
                                    </div>

                                    {/* Time Input Fields */}
                                    <div className="row mt-5 g-3 justify-content-center">
                                        <div className="col-12 col-md-5">
                                            <label htmlFor="openingTime" className='form-label'>Opening Time</label>
                                            <input
                                                type="time"
                                                className='form-control form-control-lg'
                                                value={openTime}
                                                onChange={handleOpenTimeChange}
                                            />
                                        </div>
                                        <div className="col-12 col-md-5">
                                            <label htmlFor="closingTime" className='form-label'>Closing Time</label>
                                            <input
                                                type="time"
                                                className='form-control form-control-lg'
                                                value={closeTime}
                                                onChange={handleCloseTimeChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save & Next Button */}
                            <div className="col-12 text-center p-3 p-md-5">
                                <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleSubmit}>
                                    Save & Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }




    function BusinessDesc() {
        const [description, setDescription] = useState('')
        console.log(formData)
        const handleDescSubmit = () => {
            setFormData(prevFormData => ({
                ...prevFormData,
                description: description,
            }));
            handleNextStep()
        }
        return (
            <>
                <div className='h-100vh'>
                    <div className="row  h-100 justify-content-center">
                        {/* Left Image Section */}
                        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                            <img src="/src/assets/images/business-description.jpg" alt="" className='w-100 h-100' />
                        </div>

                        {/* Right Form Section */}
                        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                            <div className='row  justify-content-center'>
                                <div className='col-12 text-center'>
                                    <h1 className='fw-bold'>Add <br /> Business Description</h1>
                                </div>

                                {/* Text Editor Section */}
                                <div className="col-12 col-md-10 p-3 p-md-5">
                                    <textarea name="description_main" className='w-100 form-control form-control-lg' rows={5} onChange={(e) => { setDescription(e.target.value) }} id="" value={description} placeholder='Business Description'>{description}</textarea>
                                </div>
                            </div>

                            {/* Save & Next Button */}
                            <div className="col-12 text-center p-3 ">
                                <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleDescSubmit}>
                                    Save & Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }

    function LandingPageDetails() {
        console.log(formData);
        const [theme, setTheme] = useState('');
        const [landingPageHero, setLandingPageHero] = useState({
            title: "",
            description: "",
            coverImage: "",
        });
        const [productSection, setProductSection] = useState([]);
        const [welcomePart, setWelcomePart] = useState({
            title: "",
            description: "",
            coverImage: "",
        })
        const [services, setServices] = useState([{ title: "", description: "" }]);
        const [otherDetails, setOtherDetails] = useState([{ title: "", description: "", image: "" }]);
        const [products, setProducts] = useState([{ id: "", title: "", description: "", image: "", price: "" }]);
        const [menu, setMenu] = useState([{ id: "", category: "", product_name: "", price: "", image: "" }]);
    
        const handleFileChange = (name, index = null, e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (index !== null) {
                    if (name === "productImage") {
                        const updatedProducts = [...products];
                        updatedProducts[index].image = file.name;
                        setProducts(updatedProducts);
                        console.log(products)
                    } else if (name === "menuImage") {
                        const updatedMenu = [...menu];
                        updatedMenu[index].image = file.name;
                        setMenu(updatedMenu);
                        console.log(updatedMenu)
                    } else if (name === "otherDetailsImage") {
                        const updatedOtherDetails = [...otherDetails];
                        updatedOtherDetails[index].image = file.name;
                        setOtherDetails(updatedOtherDetails);
                        console.log(updatedOtherDetails)
                    }

                } else {
                    setLandingPageHero((prevData) => ({
                        ...prevData,
                        coverImage: file.name,
                    }));
                }
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };
    
        const addMoreProduct = () => {
            setProducts((prevProducts) => [
                ...prevProducts,
                { id: "", title: "", description: "", image: "", price: "" },
            ]);
        };
    
        const addMoreMenu = () => {
            setMenu((prevMenu) => [
                ...prevMenu,
                { id: "", category: "", product_name: "", price: "", image: "" },
            ]);
        };
    
        const handleHeroChange = (e) => {
            const { name, value } = e.target; // Destructure name and value from e.target
            setLandingPageHero((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            console.log(landingPageHero)
        };
    
        const handleServiceChange = (index, e) => {
            const { name, value } = e.target; // Destructure name and value
            setServices((prevServices) => {
                const updatedServices = [...prevServices];
                updatedServices[index][name] = value;
                return updatedServices;
            });
        };
    
        const handleOtherDetailsChange = (index, e) => {
            const { name, value } = e.target; // Destructure name and value
            setOtherDetails((prevDetails) => {
                const updatedDetails = [...prevDetails];
                updatedDetails[index][name] = value;
                return updatedDetails;
            });
        };
    
        const uploadImage = (index, name) => {
            document.querySelectorAll(`.${name}Input`)[index].click();
        };
    
        const LandImageUpload = () => {
            document.getElementById('LandingImageInput').click();
        };

        const handleWelcomeChange = (e) => {
            setWelcomePart((prevData) => {
                
            })
        }
    
        const handleLandingSubmit =  () => {
            setFormData(prevFormData => ({
                ...prevFormData,
                landingPageHero:landingPageHero,
                theme:theme,
                productSection:products,

            })
        )
            handleNextStep()
        };
    
        return (
            <div className='h-100vh'>
                <div className="row h-100 justify-content-center">
                    {/* Left Image Section */}
                    <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                        <img src="/src/assets/images/landing-page.jpg" alt="" className='w-100 h-100' />
                    </div>
    
                    {/* Right Form Section */}
                    <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                        <div className='row justify-content-center'>
                            <div className='col-12 text-center'>
                                <h1 className='fw-bold'>Add Details <br /> About Landing Page</h1>
                            </div>
    
                            {/* Color Theme Section */}
                            <div className="col-12 col-md-10 p-3 p-md-5">
                                <h5 className='fs-18 mb-4 p-3 text-center bg-dark text-white mt-3'>Color Theme</h5>
                                <input
                                    type="text"
                                    name="color"
                                    className='form-control form-control-lg'
                                    placeholder='Color Theme'
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                />
    
                                {/* Landing Page Hero Details */}
                                <h5 className='fs-18 mb-4 p-3 text-center bg-dark text-white mt-3'>Add Landing Page Hero</h5>
                                <input
                                    type="text"
                                    name="title"
                                    className='form-control form-control-lg mb-3'
                                    placeholder='Title'
                                    value={landingPageHero.title}
                                    onChange={handleHeroChange}
                                />
                                <textarea
                                    name="description"
                                    className='form-control form-control-lg mb-3'
                                    placeholder='Description'
                                    value={landingPageHero.description}
                                    onChange={handleHeroChange}
                                />
    
                                {/* Image Upload */}
                                <input type="file" hidden id='LandingImageInput' onChange={(e) => handleFileChange("coverImage", null, e)} />
                                <div onClick={LandImageUpload} className="p-2 mt-2 mb-3 add-logo-div" id='LandingImageDiv'>
                                    <div className="text-center" id="addLandingImageDiv">
                                        <img src="/src/assets/images/add_image.png" width="50" alt="Add Landing Image" />
                                        <div className="col-12">
                                            <span>Add Image</span>
                                        </div>
                                    </div>
                                </div>

                                <h5 className='fs-18 mb-4 p-3 text-center bg-dark text-white mt-3'>Add Landing Page Hero</h5>
                                <input
                                    type="text"
                                    name="title"
                                    className='form-control form-control-lg mb-3'
                                    placeholder='Title'
                                    value={welcomePart.title}
                                    onChange={handleWelcomeChange}
                                />
                                <textarea
                                    name="description"
                                    className='form-control form-control-lg mb-3'
                                    placeholder='Description'
                                    value={welcomePart.description}
                                    onChange={handleWelcomeChange}
                                />
    
                                {/* Image Upload */}
                                <input type="file" hidden id='LandingImageInput' onChange={(e) => handleFileChange("welcomeImage", null, e)} />
                                <div onClick={LandImageUpload} className="p-2 mt-2 mb-3 add-logo-div" id='LandingImageDiv'>
                                    <div className="text-center" id="addLandingImageDiv">
                                        <img src="/src/assets/images/add_image.png" width="50" alt="Add Landing Image" />
                                        <div className="col-12">
                                            <span>Add Image</span>
                                        </div>
                                    </div>
                                </div>
    
                                {/* Special Services Details */}
                                <h5 className='fs-18 mb-4 p-3 text-center bg-dark text-white mt-3'>Add Special Services</h5>
                                {products.map((p, index) => (
                                    <div key={index} className='row align-items-center'>
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Name'
                                            value={p.title}
                                            onChange={(e) => {
                                                const updatedProducts = [...products];
                                                updatedProducts[index].title = e.target.value;
                                                setProducts(updatedProducts);
                                            }}
                                        />
                                        <textarea
                                            name="description"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Description'
                                            value={p.description}
                                            onChange={(e) => {
                                                const updatedProducts = [...products];
                                                updatedProducts[index].description = e.target.value;
                                                setProducts(updatedProducts);
                                            }}
                                        />
                                        <div className="col-12 col-md-3 mb-3">
                                            <input type="file" hidden className='productImageInput' onChange={(e) => handleFileChange("productImage", index, e)} />
                                            <div onClick={() => uploadImage(index, 'productImage')} className="p-2 mt-2 add-logo-div">
                                                <div className="text-center">
                                                    <img src={p.image || "/src/assets/images/add_image.png"} width="50" alt="Add Product Image" />
                                                    <div className="col-12">
                                                        <span>Add Image</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <input
                                                type="number"
                                                name="price"
                                                className='form-control form-control-lg w-100 mb-3'
                                                placeholder='Price'
                                                value={p.price}
                                                onChange={(e) => {
                                                    const updatedProducts = [...products];
                                                    updatedProducts[index].price = e.target.value;
                                                    setProducts(updatedProducts);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <a href='#' onClick={addMoreProduct} className='text-decoration-none'>+ Add More Product</a>
    
                                {/* Services Details */}
                                <h5 className='fs-18 mb-4 mt-3 p-3 text-center bg-dark text-white mt-3'>Add Services Details</h5>
                                {services.map((service, index) => (
                                    <div key={index} className='row align-items-center'>
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Service Title'
                                            value={service.title}
                                            onChange={(e) => handleServiceChange(index, e)}
                                        />
                                        <textarea
                                            name="description"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Service Description'
                                            value={service.description}
                                            onChange={(e) => handleServiceChange(index, e)}
                                        />
                                    </div>
                                ))}
                                <a href='#' onClick={() => setServices((prev) => [...prev, { title: "", description: "" }])} className='text-decoration-none'>+ Add More Service</a>
    
                                {/* Other Details Section */}
                                <h5 className='fs-18 mb-4 mt-3 p-3 text-center bg-dark text-white mt-3'>Add Other Details</h5>
                                {otherDetails.map((detail, index) => (
                                    <div key={index} className='row align-items-center'>
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Detail Title'
                                            value={detail.title}
                                            onChange={(e) => handleOtherDetailsChange(index, e)}
                                        />
                                        <textarea
                                            name="description"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Detail Description'
                                            value={detail.description}
                                            onChange={(e) => handleOtherDetailsChange(index, e)}
                                        />
                                        <div className="col-12 col-md-3 mb-3">
                                            <input type="file" hidden className='otherDetailsImageInput' onChange={(e) => handleFileChange("otherDetailsImage", index, e)} />
                                            <div onClick={() => uploadImage(index, 'otherDetailsImage')} className="p-2 mt-2 add-logo-div">
                                                <div className="text-center">
                                                    <img src={detail.image || "/src/assets/images/add_image.png"} width="50" alt="Add Other Detail Image" />
                                                    <div className="col-12">
                                                        <span>Add Image</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <a href='#' onClick={() => setOtherDetails((prev) => [...prev, { title: "", description: "", image: "" }])} className='text-decoration-none'>+ Add More Detail</a>
    
                                {/* Menu Section */}
                                <h5 className='fs-18 mb-4 mt-3 p-3 text-center bg-dark text-white mt-3'>Add Menu</h5>
                                {menu.map((item, index) => (
                                    <div key={index} className='row align-items-center'>
                                        <input
                                            type="text"
                                            name="category"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Menu Category'
                                            value={item.category}
                                            onChange={(e) => {
                                                const updatedMenu = [...menu];
                                                updatedMenu[index].category = e.target.value;
                                                setMenu(updatedMenu);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            name="product_name"
                                            className='form-control form-control-lg mb-3'
                                            placeholder='Product Name'
                                            value={item.product_name}
                                            onChange={(e) => {
                                                const updatedMenu = [...menu];
                                                updatedMenu[index].product_name = e.target.value;
                                                setMenu(updatedMenu);
                                            }}
                                        />
                                        <div className="col-12 col-md-3 mb-3">
                                            <input type="file" hidden className='menuImageInput' onChange={(e) => handleFileChange("menuImage", index, e)} />
                                            <div onClick={() => uploadImage(index, 'menuImage')} className="p-2 mt-2 add-logo-div">
                                                <div className="text-center">
                                                    <img src={item.image || "/src/assets/images/add_image.png"} width="50" alt="Add Menu Image" />
                                                    <div className="col-12">
                                                        <span>Add Image</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            className='form-control form-control-lg w-100 mb-3'
                                            placeholder='Price'
                                            value={item.price}
                                            onChange={(e) => {
                                                const updatedMenu = [...menu];
                                                updatedMenu[index].price = e.target.value;
                                                setMenu(updatedMenu);
                                            }}
                                        />
                                    </div>
                                ))}

                                    <h5 className='fs-18 mb-4 mt-3 p-3 text-center bg-dark text-white mt-3'>Other Details</h5>
                                    {otherDetails.map((detail, index) => (
                                        <div key={index} className='row align-items-center'>
                                            <input
                                                type="text"
                                                name="title"
                                                className='form-control form-control-lg mb-3'
                                                placeholder='Detail Title'
                                                value={detail.title}
                                                onChange={(e) => handleOtherDetailsChange(index, e)}
                                            />
                                            <textarea
                                                name="description"
                                                className='form-control form-control-lg mb-3'
                                                placeholder='Detail Description'
                                                value={detail.description}
                                                onChange={(e) => handleOtherDetailsChange(index, e)}
                                            />
                                            <div className="col-12 col-md-3 mb-3">
                                                <input type="file" hidden className='otherDetailsImageInput' onChange={(e) => handleFileChange("otherDetailsImage", index, e)} />
                                                <div onClick={() => UploadImage(index, 'otherDetailsImage')} className="p-2 mt-2 add-logo-div">
                                                    <div className="text-center">
                                                        <img src={detail.image || "/src/assets/images/add_image.png"} width="50" alt="Add Logo" />
                                                        <div className="col-12">
                                                            <span>Add Image</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                <div className='col-12 mt-4 text-center'>
                                    <button className='btn btn-theme2 w-100 text-center' onClick={handleLandingSubmit}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function SeoDetails() {
        const [socialMediaLinks, setSocialMediaLinks] = useState([
            { tag: 'instagram', link: '' },
            { tag: 'facebook', link: '' },
            { tag: 'twitter', link: '' }
        ]);
    
        const [seoData, setSeoData] = useState({
            title: '',
            description: '',
            metaTags: ['']
        });
    
        // Handle tag change
        const handleTagChange = (index, value) => {
            const updatedTags = [...seoData.metaTags];
            updatedTags[index] = value;
            setSeoData(prevSeo => ({
                ...prevSeo,
                metaTags: updatedTags
            }));
        };
    
        // Add more tags
        const addTag = () => {
            setSeoData(prevSeo => ({
                ...prevSeo,
                metaTags: [...prevSeo.metaTags, ''] // Add a new empty string for the new tag
            }));
        };
    
        // Remove a tag
        const removeTag = (index) => {
            setSeoData(prevSeo => ({
                ...prevSeo,
                metaTags: prevSeo.metaTags.filter((_, i) => i !== index) // Remove tag at the specified index
            }));
        };
    
        // Handle changes in SEO data fields
        const handleSeoInputChange = (e) => {
            const { name, value } = e.target;
            setSeoData(prevSeo => ({
                ...prevSeo,
                [name]: value
            }));
        };
    
        // Handle social media input changes
        const handleSocialMediaChange = (index, value) => {
            const updatedLinks = [...socialMediaLinks];
            updatedLinks[index].link = value;
            setSocialMediaLinks(updatedLinks);
        };
    
        // Handle form submit and update formData with socialMediaLinks and seoData
        const handleSeoSubmit = () => {
            setFormData(prevFormData => ({
                ...prevFormData,
                socialMediaLinks: socialMediaLinks,
                seoData: seoData
            }));
            handleNextStep()
        };
    
        return (
            <div className='h-100vh'>
                <div className="row justify-content-center">
                    {/* Left Image Section - Hidden on small screens */}
                    <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                        <img src="/src/assets/images/landing-page.jpg" alt="" className='w-100 h-100' />
                    </div>
    
                    {/* Right Form Section */}
                    <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                        <div className='row justify-content-center'>
                            <div className='col-12 text-center'>
                                <h1 className='fw-bold'>Add SEO</h1>
                            </div>
    
                            {/* Form Fields */}
                            <div className="col-12 col-md-10 p-3 p-md-5">
                                <div className="col-12 mb-3">
                                    <input
                                        type="text"
                                        name="title"
                                        className='form-control form-control-lg'
                                        placeholder='Title'
                                        value={seoData.title}
                                        onChange={handleSeoInputChange}
                                    />
                                </div>
    
                                <div className="col-12 mb-3">
                                    <textarea
                                        name="description"
                                        className='form-control form-control-lg'
                                        placeholder='Description..'
                                        value={seoData.description}
                                        onChange={handleSeoInputChange}
                                    ></textarea>
                                </div>
    
                                {/* Tags Section */}
                                <div className="col-12 mb-3">
                                    {seoData.metaTags.map((tag, index) => (
                                        <div className="input-group mb-2" key={index}>
                                            <input
                                                type="text"
                                                className='form-control form-control-lg'
                                                placeholder='Tag'
                                                value={tag}
                                                onChange={(e) => handleTagChange(index, e.target.value)}
                                            />
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeTag(index)}
                                                type="button"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="btn btn-link"
                                        onClick={addTag}
                                    >
                                        + add more tags
                                    </button>
                                </div>
    
                                {/* Social Media Links */}
                                {socialMediaLinks.map((link, index) => (
                                    <div className="col-12 mb-3 mt-3" key={index}>
                                        <input
                                            type="text"
                                            name={link.tag}
                                            className='form-control form-control-lg'
                                            placeholder={link.tag}
                                            value={link.link}
                                            onChange={(e) => handleSocialMediaChange(index, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
    
                        {/* Save & Next Button */}
                        <div className="col-12 text-center p-3 p-md-5">
                            <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleSeoSubmit}>
                                Save & Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    function MoreImages() {
        const [images, setImages] = useState([{ file: null, fileName: '' }]); 
        const handleFileChange = (index, event) => {
            const file = event.target.files[0]; 
            if (file) {
                const newImages = [...images];
                newImages[index] = { file, fileName: file.name }; 
                setImages(newImages); 
            }
        };
    
        const addImageInput = () => {
            setImages((prevImages) => [...prevImages, { file: null, fileName: '' }]); 
        };
    
        const handleAddImageClick = (index) => {
            document.getElementById(`file-input-${index}`).click(); 
        };
    
        const handleGallerySubmit = () => {
            const imageFileNames = images.map(image => image.fileName);
            const imageFiles = images.map(image => image.file);
        
            setFormData(prevFormData => ({
                ...prevFormData,
                gallery: imageFileNames,
            }));
        
            const preRequestUrl = async () => {
                try {
                    const url = 'https://businessbazaarserver.auxxweb.in/api/v1/s3url';
                    const requestBody = {
                        file_names: imageFileNames,
                    };
        
                    // Request the pre-signed S3 URLs
                    const response = await axios.post(url, requestBody, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
        
                    const s3Urls = response.data.data;
                    console.log(s3Urls)
        
                    await Promise.all(
                        s3Urls.map(async (data, index) => {
                            const { url, file_type } = data;
                            const file = imageFiles[index];
                            console.log(data,'aaaaaaaaaaaaaaaaaaaaaaaa')
                            const uploadResponse = await axios.put(url, file, {
                                headers: {
                                    'Content-Type': file_type,
                                },
                            });
                            console.log('Upload response:', uploadResponse.status);
                        })
                    );
        
                    handleNextStep();
                } catch (error) {
                    console.error('Error fetching the S3 URLs or uploading files:', error);
                }
            };
        
            preRequestUrl(); 
        };
        
        
    
        return (
            <>
                <div className='h-100vh'>
                    <div className="row h-100 justify-content-center">
                        {/* Left Image Section - Hidden on small screens */}
                        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                            <img src="/src/assets/images/landing-page.jpg" alt="" className='w-100 h-100' />
                        </div>
    
                        {/* Right Form Section */}
                        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                            <div className='row justify-content-center'>
                                <div className='col-12 text-center'>
                                    <h1 className='fw-bold'>Add Images</h1>
                                </div>
    
                                {/* Image Upload Fields */}
                                <div className="col-12 col-md-10 p-3 p-md-5">
                                    <div className="row mb-3">
                                        {images.map((image, index) => (
                                            <div className="col-6 col-md-3 mb-3" key={index}>
                                                <input
                                                    type="file"
                                                    hidden
                                                    id={`file-input-${index}`}
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(index, e)}
                                                />
                                                <div
                                                    className="p-2 add-logo-div"
                                                    onClick={() => handleAddImageClick(index)}
                                                >
                                                    <div className="text-center">
                                                        {image.fileName ? (
                                                            <img src={URL.createObjectURL(image.file)} alt={`Uploaded Preview ${index}`} className='img-preview' width="100" />
                                                        ) : (
                                                            <img src="/src/assets/images/add_image.png" width="50" alt="Add Image" />
                                                        )}
                                                        <div className="col-12">
                                                            <span>{image.fileName || "Add Image"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="col-12 mb-3 text-center">
                                        <button className="btn btn-link text-decoration-none" onClick={addImageInput}>
                                            + Add another image
                                        </button>
                                    </div>
                                </div>
                            </div>
    
                            {/* Save & Next Button */}
                            <div className="col-12 text-center p-3 p-md-5">
                                <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleGallerySubmit}>
                                    Save & Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    

    function MoreVideos() {
        const [videos, setVideos] = useState([{ file: null, fileName: '' }]); 
    
        const handleFileChange = (index, event) => {
            const file = event.target.files[0]; 
            if (file) {
                const newVideos = [...videos];
                newVideos[index] = { file, fileName: file.name }; 
                setVideos(newVideos); 
            }
        };
    
        const addVideoInput = () => {
            setVideos((prevVideos) => [...prevVideos, { file: null, fileName: '' }]); 
        };
    
        const handleAddVideoClick = (index) => {
            document.getElementById(`file-input-${index}`).click();
        };
    
        const handleGallerySubmit = async () => {
            const videoFileNames = videos.map(video => video.fileName);
            const videoFiles = videos.map(video => video.file);
            
            // Set video names to formData
            setFormData(prevFormData => ({
                ...prevFormData,
                gallery: videoFileNames,
            }));
    
            const preRequestUrl = async () => {
                try {
                    const url = 'https://businessbazaarserver.auxxweb.in/api/v1/s3url';
                    const requestBody = {
                        file_names: videoFileNames,
                    };
                    const response = await axios.post(url, requestBody, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
    
                    const s3Urls = response.data.data;
    
                    // await Promise.all(
                    //     s3Urls.map(async (data, index) => {
                    //         const { url, file_type } = data;
                    //         const file = videoFiles[index];
    
                    //         await axios.put(url, file, {
                    //             headers: {
                    //                 'Content-Type': file_type,
                    //             },
                    //         });
                    //     })
                    // );
    
                    handleNextStep(); 
                } catch (error) {
                    console.error('Error fetching the S3 URLs or uploading files:', error);
                }
            };
    
            preRequestUrl(); 
        };
    
        return (
            <div className='h-100vh'>
                <div className="row h-100 justify-content-center">
                    {/* Left Image Section - Hidden on small screens */}
                    <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                        <img src="/src/assets/images/landing-page.jpg" alt="" className='w-100 h-100' />
                    </div>
    
                    {/* Right Form Section */}
                    <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                        <div className='row justify-content-center'>
                            <div className='col-12 text-center'>
                                <h1 className='fw-bold'>Add Videos</h1>
                            </div>
    
                            {/* Video Upload Fields */}
                            <div className="col-12 col-md-10 p-3 p-md-5">
                                <div className="row mb-3">
                                    {videos.map((video, index) => (
                                        <div className="col-6 col-lg-3 mb-3" key={index}>
                                            <input
                                                type="file"
                                                hidden
                                                id={`file-input-${index}`}
                                                accept="video/*"
                                                onChange={(e) => handleFileChange(index, e)}
                                            />
                                            <div
                                                className="p-2 add-logo-div"
                                                onClick={() => handleAddVideoClick(index)}
                                            >
                                                <div className="text-center">
                                                    {video.file ? (
                                                        <video width="100%" controls className='video-preview'>
                                                            <source src={URL.createObjectURL(video.file)} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <img src="/src/assets/images/add-video.png" width="50" alt="Add Video" />
                                                    )}
                                                    <div className="col-12">
                                                        <span>Add Video</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-12 mb-3 text-center">
                                    <button className="btn btn-link text-decoration-none" onClick={addVideoInput}>
                                        + Add another video
                                    </button>
                                </div>
                            </div>
                        </div>
    
                        {/* Save & Next Button */}
                        <div className="col-12 text-center p-3 p-md-5">
                            <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleGallerySubmit}>
                                Save & Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    function Subscription() {
        // Manage active state for Free and Premium plan features
        const [activeTicks, setActiveTicks] = useState({
            free: [true, false, false, false, false, false],
            premium: [true, true, true, true, true, true]
        });

        const toggleActiveTick = (plan, index) => {
            setActiveTicks((prevTicks) => ({
                ...prevTicks,
                [plan]: prevTicks[plan].map((item, idx) => idx === index ? !item : item)
            }));
        };

        return (
            <>
                <div className='h-100vh'>
                    <div className="row h-100 justify-content-center">
                        {/* Left Image Section - Hidden on small screens */}
                        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                            <img src="/src/assets/images/subscription.jpg" alt="" className='w-100 h-100' />
                        </div>
                        {/* Right Form Section */}
                        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                            <div className='row justify-content-center'>
                                <div className='col-12 text-center'>
                                    <h1 className='fw-bold'>Add Subscriptions</h1>
                                </div>
                                <div className="col-12">
                                    <div className="row justify-content-center">
                                        {/* Free Plan */}
                                        <div className="col-12 col-md-6 mb-4">
                                            <div className="card br-20 b-theme2">
                                                <div className="p-4">
                                                    <div className="col-12 text-center">
                                                        <span className='fw-bold'>Free Plan</span>
                                                    </div>
                                                    <div className="row mt-2 mb-2">
                                                        <div className="col-4">
                                                            <h1 className='fw-bold fs-30'>₹0</h1>
                                                        </div>
                                                        <div className="col-8 p-0 text-start">
                                                            <span className="text-secondary">per editor/month</span> <br />
                                                            <span className="text-secondary">Billed Monthly</span>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 mt-4'>
                                                        {['10 gen per day', 'Unlimited Relaxed generations', 'General commercial terms', 'Access to member gallery', 'Optional credit top ups', '12 concurrent fast jobs'].map((feature, index) => (
                                                            <div className='mt-2' key={index}>
                                                                <span
                                                                    className={`subscription-tick bg-light ${activeTicks.free[index] ? 'active' : ''}`}
                                                                    onClick={() => toggleActiveTick('free', index)}
                                                                >
                                                                    <i className="bi bi-check"></i>
                                                                </span>
                                                                <span className='fs-16'>{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4">
                                                        <button className="btn w-100 text-white" style={{ backgroundColor: "#5b7ee88c" }}>Choose Plan</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Premium Plan */}
                                        <div className="col-12 col-md-6 mb-4">
                                            <div className="card br-20 b-theme2">
                                                <div className="p-4">
                                                    <div className="col-12 text-center">
                                                        <span className='fw-bold'>Premium Plan</span>
                                                    </div>
                                                    <div className="row mt-2 mb-2">
                                                        <div className="col-4">
                                                            <h1 className='fw-bold fs-30'>₹500</h1>
                                                        </div>
                                                        <div className="col-8 p-0 text-start">
                                                            <span className="text-secondary">per editor/month</span> <br />
                                                            <span className="text-secondary">Billed Monthly</span>
                                                        </div>
                                                    </div>
                                                    <div className='col-12 mt-4'>
                                                        {['30h Fast generations', 'Unlimited Relaxed generations', 'General commercial terms', 'Access to member gallery', 'Optional credit top ups', '12 concurrent fast jobs'].map((feature, index) => (
                                                            <div className='mt-2' key={index}>
                                                                <span
                                                                    className={`subscription-tick bg-light ${activeTicks.premium[index] ? 'active' : ''}`}
                                                                    onClick={() => toggleActiveTick('premium', index)}
                                                                >
                                                                    <i className="bi bi-check"></i>
                                                                </span>
                                                                <span className='fs-16'>{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4">
                                                        <button className="btn w-100 text-white" style={{ backgroundColor: "#5b7ee88c" }}>Choose Plan</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-center p-3 p-md-5">
                                <button className="btn btn-theme2 w-100 text-white p-2" onClick={handleNextStep}>
                                    Save & Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const Razorpay = () => {
        const [isScriptLoaded, setScriptLoaded] = useState(false);

        // Function to load the Razorpay SDK dynamically
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => {
                    setScriptLoaded(true);
                    resolve(true);
                };
                script.onerror = () => {
                    setScriptLoaded(false);
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        };

        // Function to open Razorpay payment window
        const handlePayment = async () => {
            if (!isScriptLoaded) {
                const loaded = await loadRazorpayScript();
                if (!loaded) {
                    alert('Razorpay SDK failed to load. Are you online?');
                    return;
                }
            }

            const options = {
                key: 'rzp_test_1234567890abcdef', // Dummy Razorpay key ID for testing
                amount: 50000, // Amount in paise (50000 paise = ₹500)
                currency: 'INR',
                name: 'Demo Company',
                description: 'Test Transaction',
                image: 'https://your_logo_url.com/logo.png', // Dummy logo URL
                handler: function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    // Handle payment response (this is where you'd send the payment info to the backend)
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Sample Address',
                },
                theme: {
                    color: '#F37254', // Customize theme color
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        };

        // Automatically open the Razorpay window when the component loads
        useEffect(() => {
            handlePayment();
        }, []); // The empty array ensures this runs only once, on component mount

    };




    return (
        <>
            {step === 1 && <BusinessDetails />}
            {step === 2 && <ContactDetails />}
            {step === 3 && <CatgoryDetails />}
            {step === 4 && <ServicesOffering />}
            {step === 5 && <BusinessTiming />}
            {step === 6 && <BusinessDesc />}
            {step === 7 && <LandingPageDetails />}
            {step === 8 && <SeoDetails />}
            {step === 9 && <MoreImages />}
            {step === 10 && <MoreVideos />}
            {step === 11 && <Subscription />}
            {step === 12 && <Razorpay />}
        </>
    );
}