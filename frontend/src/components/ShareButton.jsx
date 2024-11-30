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
        const vCardData = `BEGIN:VCARD
      VERSION:3.0
      FN:John Doe
      TEL:+1234567890
      EMAIL:johndoe@example.com
      END:VCARD`;
      
        // Create a Blob from the vCard data
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
      
        // Create a temporary anchor element to trigger the download  
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contact.vcf'; // Filename for the vCard
        a.click();
        URL.revokeObjectURL(url); // Clean up the URL object
      };


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
