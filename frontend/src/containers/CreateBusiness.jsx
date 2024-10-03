import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ColorPicker } from 'primereact/colorpicker';
import { Editor } from 'primereact/editor';
import { color } from '@mui/system';


export default function CreateBusiness() {


    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    function imageUpload(event) {
        document.getElementById('ImageLogo').click();
    }

    function LogoChange(event) {
        document.getElementById('addImageDiv').remove();

        var image = document.createElement('img');

        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                image.src = e.target.result;
                image.width = 100;
            }
            reader.readAsDataURL(file);
        }

        document.getElementById('businessMainDiv').appendChild(image);
    }


    const [mobileNumbers, setMobileNumbers] = useState([{ id: 1 }]);
    const [whatsappNumbers, setWhatsappNumbers] = useState([{ id: 1 }]);
    const [emails, setEmails] = useState([{ id: 1 }]);

    const addMobileNumber = () => {
        setMobileNumbers([...mobileNumbers, { id: mobileNumbers.length + 1 }]);
    };

    const removeMobileNumber = (id) => {
        setMobileNumbers(mobileNumbers.filter(number => number.id !== id));
    };

    const addWhatsappNumber = () => {
        setWhatsappNumbers([...whatsappNumbers, { id: whatsappNumbers.length + 1 }]);
    };

    const removeWhatsappNumber = (id) => {
        setWhatsappNumbers(whatsappNumbers.filter(number => number.id !== id));
    };

    const addEmail = () => {
        setEmails([...emails, { id: emails.length + 1 }]);
    };

    const removeEmail = (id) => {
        setEmails(emails.filter(email => email.id !== id));
    };







    const [countries, setCountries] = useState([
        "Technology",
        "Health & Wellness",
        "Finance",
        "Education",
        "Real Estate",
        "Food & Beverage",
        "Travel",
        "Entertainment",
        "Retail",
        "Automotive",
        "Construction",
        "Consulting",
        "Marketing",
        "E-commerce",
        "Non-Profit",
    ]);





    function BusinessDetails() {
        return (
            <>
                <div className='h-100vh'>
                    <div className="row justify-content-center h-100">
                        <div className="d-none d-md-block left-portion   p-0 col-5 h-100">
                            <img src="/src/assets/images/business-details.jpg" alt="" className='w-100 h-100' />
                        </div>
                        <div className="col-12 col-md-7 row align-items-center right-portion p-5">
                            <div>
                                <div className="col-12">
                                    <h1 className='fw-bold text-center text-md-start'>
                                        Enter your <br /> Business Details
                                    </h1>
                                </div>
                                <div className="col-12 mt-3" >
                                    <input type="text" placeholder="Business Name" className="form-control form-control-lg" />
                                    <input type="file" hidden id="ImageLogo" onChange={LogoChange} />

                                    <div onClick={imageUpload} className="p-2 mt-2 add-logo-div" id='businessMainDiv'>
                                        <div className="text-center" id="addImageDiv">
                                            <img src="/src/assets/images/add_image.png" width="50" alt="Add Logo" />
                                            <div className="col-12">
                                                <span>Add Logo</span>
                                            </div>
                                        </div>
                                    </div>

                                    <input type="text" placeholder="Building Name" className="form-control form-control-lg mt-3" />
                                    <input type="text" placeholder="Street / Colony Name" className="form-control form-control-lg mt-3" />
                                    <input type="text" placeholder="Landmark" className="form-control form-control-lg mt-3" />
                                    <div className="row">
                                        <div className="col-12 col-md-6 mt-3">
                                            <input type="text" className="form-control form-control-lg w-100" placeholder="State" />
                                        </div>
                                        <div className="col-12 col-md-6 mt-3">
                                            <input type="text" className="form-control form-control-lg w-100" placeholder="Pincode" />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <button className="btn  btn-theme2 w-100" onClick={handleNextStep}>Save & Next</button>
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
        return (
            <>
                <div className='h-100vh'>
                    <div className="row  h-100">
                        <div className="d-none d-md-block left-portion   p-0 col-5">
                            <img src="/src/assets/images/contact-details.jpg" alt="" className='w-100 h-100' />
                        </div>
                        <div className="col-12 col-md-7 row align-items-center right-portion p-5">
                            <div>
                                <div className="col-12">
                                    <h1 className="fw-bold text-center text-md-start mb-2">Add <br /> Contact Details</h1>
                                </div>
                                <div className="col-12 p-5 p-sm-0 mt-3">
                                    <input type="text" placeholder="Name" className="form-control form-control-lg" />

                                    {/* Mobile Number Section */}
                                    <div id="mobileNumberDiv">
                                        {mobileNumbers.map((number) => (
                                            <div className="row  mt-3" key={number.id}>
                                                <div className="col-12 col-sm-3 col-md-2">
                                                    <PhoneInput
                                                        country={'us'}
                                                        enableSearch={true}
                                                        onChange={phone => console.log(phone)}
                                                        containerStyle={{ width: '100%' }}
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-8 mt-2 mt-sm-0">
                                                    <input type="text" name="phone" className="form-control form-control-lg w-100" placeholder="Phone Number" />
                                                </div>
                                                {/* Render Remove button only if it's not the first input */}
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
                                    <a href="#" onClick={addMobileNumber} className="text-decoration-none form-text">+ add another Mobile number</a>

                                    {/* WhatsApp Number Section */}
                                    <div id="whatsappNumberDiv">
                                        {whatsappNumbers.map((number) => (
                                            <div className="row  mt-3" key={number.id}>
                                                <div className="col-12 col-sm-3 col-md-2">
                                                    <PhoneInput
                                                        country={'us'}
                                                        enableSearch={true}
                                                        onChange={phone => console.log(phone)}
                                                        containerStyle={{ width: '100%' }}
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-7 col-md-8 mt-2 mt-sm-0">
                                                    <input type="text" name="whatsapp" className="form-control form-control-lg w-100" placeholder="WhatsApp Number" />
                                                </div>
                                                <div className="col-12 col-sm-2 mt-2 mt-sm-0">
                                                    {/* Render Remove button only if it's not the first input */}
                                                    {number.id > 1 && (
                                                        <button className="btn btn-danger btn-sm w-100" onClick={() => removeWhatsappNumber(number.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <a href="#" onClick={addWhatsappNumber} className="text-decoration-none form-text">+ add another WhatsApp number</a>

                                    {/* Email Section */}
                                    {emails.map((email) => (
                                        <div className="row  mt-3" key={email.id}>
                                            <div className="col-12 col-sm-10">
                                                <input type="text" placeholder="Email" className="form-control form-control-lg" />
                                            </div>
                                            <div className="col-12 col-sm-2 mt-2 mt-sm-0">
                                                {/* Render Remove button only if it's not the first input */}
                                                {email.id > 1 && (
                                                    <button className="btn btn-danger btn-sm w-100" onClick={() => removeEmail(email.id)}>Remove</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <a href="#" onClick={addEmail} className="text-decoration-none form-text">+ add another Email</a>

                                    {/* Website Section */}
                                    <input type="url" placeholder="Website" className="form-control form-control-lg mt-3" />

                                    {/* Save Button */}
                                    <div className="col-12 mt-3">
                                        <button className="btn btn-theme2 w-100" onClick={handleNextStep}>Save & Next</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
    function CatgoryDetails() {
        return (
            <>
                <div className="h-100vh">
                    <div className="row  h-100 justify-content-center">
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
    <div style={{ flexGrow: 1 }}>
        <Autocomplete
            disablePortal
            options={countries}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Categories" />}
        />
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



    const [services, setServices] = useState([]);
    function ServicesOffering() {
        const [inputService, setInputService] = useState('');

        // Function to add a service
        const addService = (e) => {
            e.preventDefault();
            if (inputService.trim() !== '') {
                setServices([...services, inputService]); // Add the new service
                setInputService(''); // Clear the input field
            }
        };

        // Function to delete a service by filtering it out
        const deleteService = (indexToDelete) => {
            setServices(services.filter((service, index) => index !== indexToDelete));
        };

        return (
            <>
               <div className="h-100vh">
    <div className="row  h-100 justify-content-center">
        {/* Left portion (image) */}
        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
            <img src="/src/assets/images/service_offering.jpg" alt="" className="w-100 h-100" />
        </div>

        {/* Right portion (form) */}
        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
            <div className="row justify-content-center ">
                <div className="col-12 text-center">
                    <h1 className="fw-bold">
                        Add <br /> Service and Offering
                    </h1>
                </div>

                {/* Input field for adding service */}
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

                    {/* Services list */}
                    <div className="col-12 mt-4">
                        <div className="row gap-2 justify-content-center ">
                            {services.map((service, index) => (
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

            {/* Save & Next button */}
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
    };

    const [days, setDays] = useState([])

    function BusinessTiming() {
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
                                            <label htmlFor="" className='form-label'>Opening Time</label>
                                            <input type="time" className='form-control form-control-lg' />
                                        </div>
                                        <div className="col-12 col-md-5">
                                            <label htmlFor="" className='form-label'>Closing Time</label>
                                            <input type="time" className='form-control form-control-lg' />
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            {/* Save & Next Button */}
                            <div className="col-12 text-center p-3 p-md-5">
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
    

    const [description, setDescription] = useState('')

    function BusinessDesc() {

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
                    <textarea name="description_main" className='w-100 form-control form-control-lg' rows={5} onChange={(e) => { setDescription(e.target.value) }} id="" placeholder='Business Description'></textarea>
                </div>
            </div>

            {/* Save & Next Button */}
            <div className="col-12 text-center p-3 ">
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


    function LandingPageDetails() {
        const [landingData, setLandingData] = useState({
            color: "",
            title: "",
            description: "",
            image: "",
            welcomeLine: "",
            welcomeDescription: "",
            product: [
                {
                    id: "",
                    title: "",
                    description: "",
                    image: "",
                    price: "",
                }
            ],
            menu: [
                {
                    id: "",
                    category: "",
                    product_name: "",
                    price: "",
                    image: "",
                }
            ],
            services: [
                {
                    id: "",
                    title: "",
                    description: "",
                }
            ],
            otherDetails: [
                {
                    title: "",
                    description: "",
                    image: ""
                }
            ]
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setLandingData({
                ...landingData,
                [name]: value,
            });
        };

        const handleProductChange = (index, e) => {
            const { name, value } = e.target;
            const updatedProduct = [...landingData.product];
            updatedProduct[index] = {
                ...updatedProduct[index],
                [name]: value,
            };
            setLandingData({
                ...landingData,
                product: updatedProduct,
            });
        };

        const handleMenuChange = (index, e) => {
            const { name, value } = e.target;
            const updatedMenu = [...landingData.menu];
            updatedMenu[index] = {
                ...updatedMenu[index],
                [name]: value,
            };
            setLandingData({
                ...landingData,
                menu: updatedMenu,
            });
        };

        const handleServiceChange = (index, e) => {
            const { name, value } = e.target;
            const updatedServices = [...landingData.services];
            updatedServices[index] = {
                ...updatedServices[index],
                [name]: value,
            };
            setLandingData({
                ...landingData,
                services: updatedServices,
            });
        };

        const handleOtherDetailsChange = (index, e) => {
            const { name, value } = e.target;
            const updatedOtherDetails = [...landingData.otherDetails];
            updatedOtherDetails[index] = {
                ...updatedOtherDetails[index],
                [name]: value,
            };
            setLandingData({
                ...landingData,
                otherDetails: updatedOtherDetails,
            });
        };

        const handleFileChange = (name, index = null, e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (index !== null) {
                    if (name === "productImage") {
                        const updatedProduct = [...landingData.product];
                        updatedProduct[index].image = e.target.result;
                        setLandingData({
                            ...landingData,
                            product: updatedProduct,
                        });
                    } else if (name === "menuImage") {
                        const updatedMenu = [...landingData.menu];
                        updatedMenu[index].image = e.target.result;
                        setLandingData({
                            ...landingData,
                            menu: updatedMenu,
                        });
                    } else if (name === "otherDetailsImage") {
                        const updatedOtherDetails = [...landingData.otherDetails];
                        updatedOtherDetails[index].image = e.target.result;
                        setLandingData({
                            ...landingData,
                            otherDetails: updatedOtherDetails,
                        });
                    }
                } else {
                    setLandingData({
                        ...landingData,
                        [name]: e.target.result,
                    });
                }
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };

        const addMoreProduct = () => {
            setLandingData({
                ...landingData,
                product: [
                    ...landingData.product,
                    { id: "", title: "", description: "", image: "", price: "" }
                ]
            });
        };

        const addMoreMenu = () => {
            setLandingData({
                ...landingData,
                menu: [
                    ...landingData.menu,
                    { id: "", category: "", product_name: "", price: "", image: "" }
                ]
            });
        };



        const LandImageUpload = (event) => {
            document.getElementById('LandingImageInput').click();
        };

        const UploadImages = (index, name) => {
            document.querySelectorAll(`.${name}Input`)[index].click();
        };

        return (
            <>
                <div className='h-100vh'>
    <div className="row  h-100 justify-content-center">
        {/* Left Image Section */}
        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
            <img src="/src/assets/images/landing-page.jpg" alt="" className='w-100 h-100' />
        </div>

        {/* Right Form Section */}
        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
            <div className='row  justify-content-center'>
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
                        value={landingData.color}
                        onChange={handleChange}
                    />

                    {/* Frontpage Details */}
                    <h5 className='fs-18 mb-4 p-3 text-center bg-dark text-white mt-3'>Add Frontpage Details</h5>
                    <input
                        type="text"
                        name="title"
                        className='form-control form-control-lg mb-3'
                        placeholder='Title'
                        value={landingData.title}
                        onChange={handleChange}
                    />
                    <textarea
                        name="description"
                        className='form-control form-control-lg mb-3'
                        placeholder='Description'
                        value={landingData.description}
                        onChange={handleChange}
                    />

                    {/* Image Upload */}
                    <input type="file" hidden id='LandingImageInput' onChange={(e) => handleFileChange("image", null, e)} />
                    <div onClick={LandImageUpload} className="p-2 mt-2 mb-3 add-logo-div" id='LandingImageDiv'>
                        <div className="text-center" id="addLandingImageDiv">
                            <img src="/src/assets/images/add_image.png" width="50" alt="Add Logo" />
                            <div className="col-12">
                                <span>Add Image</span>
                            </div>
                        </div>
                    </div>

                    {/* Special Dish Details */}
                    <h5 className='fs-18 mb-4 p-3 text-center bg-dark text-white mt-3'>Add Special Dish Details</h5>
                    {landingData.product.map((product, index) => (
                        <div key={index} className='row align-items-center'>
                            <input
                                type="text"
                                name="title"
                                className='form-control form-control-lg mb-3'
                                placeholder='Name'
                                value={product.title}
                                onChange={(e) => handleProductChange(index, e)}
                            />
                            <textarea
                                name="description"
                                className='form-control form-control-lg mb-3'
                                placeholder='Description'
                                value={product.description}
                                onChange={(e) => handleProductChange(index, e)}
                            />
                            <div className="col-12 col-md-3 mb-3">
                                <input type="file" hidden className='productImageInput' onChange={(e) => handleFileChange("productImage", index, e)} />
                                <div onClick={() => UploadImages(index, 'productImage')} className="p-2 mt-2 add-logo-div">
                                    <div className="text-center">
                                        <img src={product.image || "/src/assets/images/add_image.png"} width="50" alt="Add Logo" />
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
                                    value={product.price}
                                    onChange={(e) => handleProductChange(index, e)}
                                />
                            </div>
                        </div>
                    ))}
                    <a href='#' onClick={addMoreProduct} className='text-decoration-none'>+ Add More Product</a>

                    {/* Menu Details */}
                    <h5 className='fs-18 mb-4 mt-3 p-3 text-center bg-dark text-white mt-3'>Add Menu Details</h5>
                    {landingData.menu.map((menuItem, index) => (
                        <div key={index} className='row align-items-center'>
                            <input
                                type="text"
                                name="category"
                                className='form-control form-control-lg mb-3'
                                placeholder='Menu Category'
                                value={menuItem.category}
                                onChange={(e) => handleMenuChange(index, e)}
                            />
                            <input
                                type="text"
                                name="product_name"
                                className='form-control form-control-lg mb-3'
                                placeholder='Product Name'
                                value={menuItem.product_name}
                                onChange={(e) => handleMenuChange(index, e)}
                            />
                            <div className="col-12 col-md-3 mb-3">
                                <input type="file" hidden className='menuImageInput' onChange={(e) => handleFileChange("menuImage", index, e)} />
                                <div onClick={() => UploadImages(index, 'menuImage')} className="p-2 mt-2 add-logo-div">
                                    <div className="text-center">
                                        <img src={menuItem.image || "/src/assets/images/add_image.png"} width="50" alt="Add Logo" />
                                        <div className="col-12">
                                            <span>Add Image</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <input
                                    type="number"
                                    name="price"
                                    className='form-control form-control-lg w-100'
                                    placeholder='Price'
                                    value={menuItem.price}
                                    onChange={(e) => handleMenuChange(index, e)}
                                />
                            </div>
                        </div>
                    ))}
                    <a href='#' onClick={addMoreMenu} className='text-decoration-none'>+ Add More Menu</a>

                    {/* Services Details */}
                    <h5 className='fs-18 mb-4 mt-3 p-3 text-center bg-dark text-white mt-3'>Add Services Details</h5>
                    {landingData.services.map((service, index) => (
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

                    {/* Other Details */}
                    <h5 className='fs-18 mb-4 mt-3'>Add Other Details</h5>
                    {landingData.otherDetails.map((detail, index) => (
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
                                <div onClick={() => UploadImages(index, 'otherDetailsImage')} className="p-2 mt-2 add-logo-div">
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
                </div>
            </div>

            {/* Save & Next Button */}
            <div className="col-12 text-center p-3 p-md-5">
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



    function SeoDetails() {
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            tags: [''], // Array to hold dynamic tags
            instagram: '',
            facebook: '',
            twitter: ''
        });

        // Handle input changes
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        };

        // Handle tag input change
        const handleTagChange = (index, value) => {
            const newTags = [...formData.tags];
            newTags[index] = value;
            setFormData((prevData) => ({
                ...prevData,
                tags: newTags
            }));
        };

        // Add more tags
        const addTag = () => {
            setFormData((prevData) => ({
                ...prevData,
                tags: [...prevData.tags, ''] // Add a new empty string for the new tag
            }));
        };

        // Remove a tag
        const removeTag = (index) => {
            setFormData((prevData) => ({
                ...prevData,
                tags: prevData.tags.filter((_, i) => i !== index) // Remove tag at the specified index
            }));
        };
        return (
            <>
               <div className='h-100vh'>
    <div className="row  justify-content-center">
        {/* Left Image Section - Hidden on small screens */}
        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
            <img src="/src/assets/images/landing-page.jpg" alt="" className='w-100 h-100' />
        </div>

        {/* Right Form Section */}
        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
            <div className='row  justify-content-center'>
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
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-12 mb-3">
                        <textarea
                            name="description"
                            className='form-control form-control-lg'
                            placeholder='Description..'
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    {/* Tags Section */}
                    <div className="col-12 mb-3">
                        {formData.tags.map((tag, index) => (
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
                    <div className="col-12 mb-3 mt-3">
                        <input
                            type="text"
                            name="instagram"
                            className='form-control form-control-lg'
                            placeholder='Instagram'
                            value={formData.instagram}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-12 mb-3 mt-3">
                        <input
                            type="text"
                            name="facebook"
                            className='form-control form-control-lg'
                            placeholder='Facebook'
                            value={formData.facebook}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-12 mb-3 mt-3">
                        <input
                            type="text"
                            name="twitter"
                            className='form-control form-control-lg'
                            placeholder='Twitter'
                            value={formData.twitter}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            {/* Save & Next Button */}
            <div className="col-12 text-center p-3 p-md-5">
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
    function MoreImages() {
        const [images, setImages] = useState([null]); // Initialize with one image upload option
    
        // Function to handle file input when an image is selected
        const handleFileChange = (index, event) => {
            const file = event.target.files[0]; // Get the selected file
            if (file) {
                const newImages = [...images];
                newImages[index] = URL.createObjectURL(file); // Store the image URL for preview
                setImages(newImages);
            }
        };
    
        // Function to add a new image input
        const addImageInput = () => {
            setImages((prevImages) => [...prevImages, null]); // Add a new entry for the new image
        };
    
        // Handle the click event to trigger the hidden file input
        const handleAddImageClick = (index) => {
            document.getElementById(`file-input-${index}`).click(); // Trigger the file input click
        };
    
        return (
            <>
                <div className='h-100vh'>
                    <div className="row  h-100 justify-content-center">
                        {/* Left Image Section - Hidden on small screens */}
                        <div className="d-none d-md-block left-portion p-0 col-md-5 h-100">
                            <img src="/src/assets/images/landing-page.jpg" alt="" className='w-100 h-100' />
                        </div>
    
                        {/* Right Form Section */}
                        <div className="col-12 col-md-7 row align-items-end justify-content-center h-100 p-3 p-md-5 right-portion">
                            <div className='row  justify-content-center'>
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
                                                        {image ? (
                                                            <img src={image} alt={`Uploaded Preview ${index}`} className='img-preview' width="100" />
                                                        ) : (
                                                            <img src="/src/assets/images/add_image.png" width="50" alt="Add Image" />
                                                        )}
                                                        <div className="col-12">
                                                            <span>Add Image</span>
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

    function MoreVideos() {
        const [videos, setVideos] = useState([null]); // Initialize with one video upload option
    
        const handleFileChange = (index, event) => {
            const file = event.target.files[0];
            if (file) {
                const newVideos = [...videos];
                newVideos[index] = URL.createObjectURL(file);
                setVideos(newVideos);
            }
        };
    
        const addVideoInput = () => {
            setVideos((prevVideos) => [...prevVideos, null]);
        };
    
        const handleAddVideoClick = (index) => {
            document.getElementById(`file-input-${index}`).click();
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
                                                        {video ? (
                                                            <video width="100%" controls className='video-preview'>
                                                                <source src={video} type="video/mp4" />
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
