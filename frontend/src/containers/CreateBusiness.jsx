import React, { useRef } from 'react';

export default function CreateBusiness() {

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
    
    function BusinessDetails() {
        return (
            <>
                <div className='h-100vh'>
                    <div className="row w-100 h-100">
                        <div className="d-none d-md-block col-5">
                            <img src="/src/assets/images/business-details.jpg" alt="" className='w-100 h-100' />
                        </div>
                        <div className="col-12 col-md-7 p-5">
                            <div className="col-12">
                                <h1 className='fw-bold'>
                                    Enter your <br /> Business Details
                                </h1>
                            </div>
                            <div className="col-12 p-5" >
                                <input type="text" placeholder="Business Name" className="form-control" />
                                <input type="file" hidden id="ImageLogo" onChange={LogoChange} />
                                
                                <div onClick={imageUpload} className="p-2 mt-2 add-logo-div" id='businessMainDiv'>
                                    <div className="text-center" id="addImageDiv">
                                        <img src="/src/assets/images/add_image.png" width="50" alt="Add Logo" />
                                        <div className="col-12">
                                            <span>Add Logo</span>
                                        </div>
                                    </div>
                                </div>

                                <input type="text" placeholder="Building Name" className="form-control mt-3" />
                                <input type="text" placeholder="Street / Colony Name" className="form-control mt-3" />
                                <input type="text" placeholder="Landmark" className="form-control mt-3" />
                                <div className="row w-100">
                                    <div className="col-12 col-md-6 mt-3">
                                        <input type="text" className="form-control w-100" placeholder="State" />
                                    </div>
                                    <div className="col-12 col-md-6 mt-3">
                                        <input type="text" className="form-control w-100" placeholder="Pincode" />
                                    </div>
                                </div>
                                
                                <div className="col-12 mt-3">
                                    <button className="btn btn-primary w-100">Save & Next</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <BusinessDetails />
        </>
    );
}
