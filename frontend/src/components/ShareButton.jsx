import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaShareAlt, FaLink, FaQrcode, FaShareSquare, FaWhatsapp ,FaAddressCard} from "react-icons/fa";
import QRCode from "qrcode";
const ShareButton = ({ number }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const [toastMessage, setToastMessage] = useState(""); // Toast message state
    const optionsRef = useRef(null);
    const buttonRef = useRef(null);
    const phoneNumber = number; // Replace with your WhatsApp number including the country code

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
    };

    const url = window.location.href; // Current page URL

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url).then(() => {
            setToastMessage("Link copied to clipboard!");
            setTimeout(() => setToastMessage(""), 2000); // Hide toast after 3 seconds
        });
    };


    const handleShareSocial = async () => {
        const url = window.location.href; // Current page URL
        const text = `Explore this page using the link below or scan the QR code:\n${url}`;

        try {
            // Create a temporary canvas element for the QR code
            const tempCanvas = document.createElement("canvas");
            const qrCodeSize = 200;

            // Generate the QR Code
            await QRCode.toCanvas(tempCanvas, url, {
                width: qrCodeSize,
                margin: 1,
            });

            // Convert the QR code canvas to a Blob
            tempCanvas.toBlob(async (blob) => {
                if (!blob) {
                    alert("Failed to generate QR code image. Please try again.");
                    return;
                }

                // Create a file from the QR code blob
                const qrFile = new File([blob], "qrcode.png", { type: "image/png" });
  
                // Check if the browser supports sharing files and URLs
                if (navigator.share && navigator.canShare({ files: [qrFile] })) {
                    try {
                        // Share both text and files (QR code)
                        await navigator.share({
                            title: "Check out this awesome page!",
                            text,
                            url,
                            files: [qrFile],
                        });
                        console.log("Shared successfully!");
                    } catch (error) {
                        console.error("Error during sharing:", error);
                        alert("Failed to share. Please try again.");
                    }
                } else {
                    alert("Sharing is not supported on this browser or device.");
                }
            }, "image/png");
        } catch (error) {
            console.error("Error generating QR code or sharing:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleSaveContact = () => {

        const contact = {
            firstName: "Derik",
            lastName: "Stenerson",
            fullName: "Derik Stenerson",
            organization: "Microsoft Corporation",
            title: "Software Engineer",
            birthday: "1963-09-21", // Correct date format YYYY-MM-DD
            address: {
                street: "One Microsoft Way",
                city: "Redmond",
                state: "WA",
                zip: "98052-6399",
                country: "USA"
            },
            workPhone: "+1-425-936-5522",
            workFax: "+1-425-936-7329",
            mobilePhone: "+1-425-936-0000",
            email: "deriks@Microsoft.com"
        };
        // Properly formatted vCard with correct date format and encoding
        const vcard = `BEGIN:VCARD\r\n\
    VERSION:3.0\r\n\
    N:${contact.lastName};${contact.firstName};;;\r\n\
    FN:${contact.fullName}\r\n\
    ORG:${contact.organization}\r\n\
    TITLE:${contact.title}\r\n\
    BDAY:${contact.birthday}\r\n\
    ADR;TYPE=WORK:;;${contact.address.street};${contact.address.city};${contact.address.state};${contact.address.zip};${contact.address.country}\r\n\
    TEL;TYPE=WORK,MSG:${contact.workPhone}\r\n\
    TEL;TYPE=WORK,FAX:${contact.workFax}\r\n\
    TEL;TYPE=CELL:${contact.mobilePhone}\r\n\
    EMAIL;TYPE=INTERNET:${contact.email}\r\n\
    END:VCARD`;
    
        // Convert to a Blob with the proper MIME type
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
    
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // For mobile devices, attempt to open the vCard file directly
            window.location.href = url;
        } else {
            // For desktop browsers, trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${contact.fullName}.vcf`; // Save with the full name as the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    
        // Clean up the URL after a delay
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 1000);
    };
    
    // Example Contact Object

    
    // Trigger vCard generation
    // generateVCard(contact);
    
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowOptions(false);
            }
        };

        const handleScroll = () => {
            setShowQRCode(false); // Close QR code on scroll
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    console.log(showOptions);

    return (
        <div>
            {/* Toast Notification */}
            {toastMessage && (
                <div
                    className="position-fixed bottom-4 right-4 bg-success text-white p-3 rounded shadow "
                    style={{ zIndex: 2000 }}
                >
                    {toastMessage}
                </div>
            )}


            {/* Share Button */}
            <button
                className="btn btn-success rounded-circle p-2 border-0 text-white position-fixed"
                onClick={() => setShowOptions(!showOptions)}
                style={{
                    right: "16px", // Adjust for better visibility on all screen sizes
                    bottom: "16px",
                    zIndex: 1050,
                }}
                ref={buttonRef}
            >
                <FaShareAlt size={26} />
            </button>

            {/* WhatsApp Button */}
            <button
                className="btn btn-success rounded-circle p-2 border-0 text-white position-fixed"
                style={{
                    right: "16px", // Keep the same right value for alignment
                    bottom: "80px", // Adjust the bottom value to be below the Share Button
                    zIndex: 1050,
                }}
                onClick={handleClick}
            >
                <FaWhatsapp size={26} />
            </button>  

            <button
                className="btn btn-success rounded-circle p-2 border-0 text-white position-fixed"
                style={{
                    right: '16px',
                    bottom: '144px', // Adjust positioning
                    zIndex: 1050,
                }}
                onClick={handleSaveContact}   
            >
                <FaAddressCard size={26} />
            </button>   


            {/* Dropdown Options */}
            {showOptions && (  
                <div
                    className="position-fixed bg-white shadow-lg rounded p-4 w-20"
                    style={{
                        zIndex: 1000,
                        bottom: "60px", // Adjust position for laptop screen
                        right: "16px",
                    }}
                    ref={optionsRef}
                >
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-outline-primary d-flex align-items-center gap-2 px-4 py-3 text-sm rounded shadow-sm"
                            onClick={handleCopyLink}
                        >
                            <FaLink size={16} />
                            Copy Link
                        </button>
                        <button
                            className="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-3 text-sm rounded shadow-sm"
                            onClick={() => setShowQRCode(!showQRCode)}
                        >
                            <FaQrcode size={16} />
                            QR Code
                        </button>
                        <button
                            className="btn btn-outline-success d-flex align-items-center gap-2 px-4 py-3 text-sm rounded shadow-sm"
                            onClick={handleShareSocial}
                        >
                            <FaShareSquare size={16} />
                            Share on Social
                        </button>
                        {showQRCode && (
                            <div
                                className="position inset-0 justify-content-center align-items-center   z-20"
                                onClick={() => setShowQRCode(false)} // Close on outside click
                            >
                                <div
                                    className="bg-white p-8 rounded shadow-lg text-center position-relative"
                                    style={{
                                        width: "70%",

                                        maxWidth: "400px",
                                        margin: "0 auto",
                                    }}
                                    onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
                                >
                                    <h2 className="h4 fw-bold mb-3 text-dark">Scan this QR Code</h2>
                                    <p className="text-secondary mb-4">
                                        Share this page by scanning or downloading the QR Code below.
                                    </p>

                                    <div
                                        className="border rounded p-3 d-flex justify-content-center align-items-center mx-auto"
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0)",
                                        }}
                                    >
                                        <QRCodeCanvas value={url} size={190} />
                                    </div>

                                    <div className="mt-4 d-flex gap-2 justify-content-center">
                                        <button
                                            className="btn btn-success px-4"
                                            onClick={() => {
                                                const qrCanvas = document.querySelector("canvas");
                                                const qrData = qrCanvas.toDataURL("image/png");
                                                const link = document.createElement("a");
                                                link.href = qrData;
                                                link.download = "qrcode.png";
                                                link.click();
                                            }}
                                        >
                                            Download
                                        </button>
                                        <button
                                            className="btn btn-danger px-4"
                                            onClick={() => setShowQRCode(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* QR Code Modal */}

        </div>
    );
};

export default ShareButton;
