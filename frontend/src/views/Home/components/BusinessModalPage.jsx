import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, Image } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';

import {
    Phone,
    Mail,
    Globe,
    MapPin,
    PhoneIcon as Phone2,
    Building2,
    Navigation,
    LinkIcon,
} from 'lucide-react';
import { FaWhatsapp, FaEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getOneFreelist } from '../../../Functions/functions';
import Layout from '../../../components/Layout';
import ShareButton from '../../../components/ShareButton';
import Loader from '../../../components/Loader/Loader';

export const BusinessModalPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [businessData, setBusinessData] = useState(null);

    const getBusinessData = async () => {
        const data = await getOneFreelist(params.id);
        setBusinessData(data.data);
    };

    useEffect(() => {
        getBusinessData();
    }, []);

    return (
        <Layout title="Business" navClass="home">
            {businessData ? (
                <>
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="modal-content bg-gradient-to-br from-gray-100 to-gray-200"
                        >
                            <Row
                                className="g-0"
                                style={{
                                    paddingLeft: '10%',
                                    paddingRight: '10%',
                                    marginTop: '6rem',
                                }}
                            >
                                <div className="w-full flex justify-start items-start my-4">
                                    <ArrowLeft
                                        className="text-start"
                                        onClick={() => {
                                            navigate('/');
                                        }}
                                    />
                                </div>
                                {/* Left Section - 60% */}
                                <Col md={8}>
                                    <motion.div
                                        className="pe-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {/* Header Section */}
                                        <div className="d-flex mb-4">
                                            <motion.div
                                                className="me-4"
                                                whileHover={{ scale: 1.05, rotate: 5 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                {businessData.logo && (
                                                    <Image
                                                        src={
                                                            businessData.logo || '/placeholder.svg'
                                                        }
                                                        alt={`${businessData.brandName} logo`}
                                                        width={120}
                                                        height={120}
                                                        className="border-4 border-amber-400 rounded-lg shadow-lg"
                                                    />
                                                )}
                                            </motion.div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start position-relative">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <p className="mb-0 text-gray-600">
                                                            {businessData?.categoryName || 'N/A'}
                                                        </p>
                                                        <h2 className="h5 mt-4 pt-2 mb-2 text-emerald-600 fw-bold">
                                                            {businessData?.name}
                                                        </h2>
                                                        <p className="mb-0 text-gray-600">
                                                            <Building2
                                                                className="me-2 inline-block text-amber-500"
                                                                size={16}
                                                            />
                                                            <strong>Brand Name:</strong>{' '}
                                                            {businessData.brandName || 'N/A'}
                                                        </p>
                                                    </motion.div>
                                                    {/* Wrap the buttons in a div to align them to the top-right */}
                                                    <div className="position-absolute top-0 end-0 d-flex">
                                                        <Button
                                                            style={{
                                                                fontSize: '30px',
                                                                fontWeight: 'bold',
                                                                color: '#6b7280',
                                                                transition:
                                                                    'color 0.3s ease-in-out',
                                                            }}
                                                            variant="link"
                                                            onClick={() =>
                                                                handleEditOpenModal(
                                                                    businessData?.contactDetails
                                                                        ?.email
                                                                )
                                                            }
                                                            className="p-0 me-3 text-blue-500 hover:text-blue-700 transition-all"
                                                        >
                                                            <FaEdit size={22} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description Section */}
                                        <motion.div
                                            className="mb-4 p-3 bg-white rounded-lg shadow-md"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            whileHover={{
                                                boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                            }}
                                        >
                                            <h5 className="mb-3 text-emerald-600">Description</h5>
                                            <p className="text-gray-700 mb-0">
                                                {businessData.description ||
                                                    'No description available.'}
                                            </p>
                                        </motion.div>

                                        {/* Images Section */}
                                        {businessData.images && businessData.images.length > 0 && (
                                            <motion.div
                                                className="mb-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <h5 className="mb-3 text-emerald-600 text-sm">
                                                    Gallery
                                                </h5>
                                                <div
                                                    className="d-flex flex-wrap gap-3 p-3 border rounded-lg bg-white overflow-auto"
                                                    style={{ maxHeight: '250px' }}
                                                >
                                                    {businessData.images.map((image, index) => (
                                                        <motion.div
                                                            key={index}
                                                            className="rounded-lg overflow-hidden shadow-md cursor-pointer"
                                                            style={{
                                                                width: '22%',
                                                                aspectRatio: '1 / 1',
                                                                minWidth: '80px',
                                                            }}
                                                            whileHover={{
                                                                scale: 1.05,
                                                                boxShadow:
                                                                    '0 8px 15px rgba(0,0,0,0.1)',
                                                                rotate: 5,
                                                            }}
                                                            transition={{
                                                                type: 'spring',
                                                                stiffness: 300,
                                                            }}
                                                            onClick={() => setModalImage(image)}
                                                        >
                                                            <Image
                                                                src={image || '/placeholder.svg'}
                                                                alt={`${businessData.name} image ${
                                                                    index + 1
                                                                }`}
                                                                width={200}
                                                                height={200}
                                                                className="w-100 h-100 hover-scale transition-all"
                                                                style={{
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </Col>

                                {/* Right Section - 40% */}
                                <Col md={4}>
                                    <motion.div
                                        className="h-100 border"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {/* Address Section */}
                                        <motion.div
                                            className="mb-4 p-3 rounded-lg shadow-md bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300"
                                            whileHover={{
                                                boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                                scale: 1.02,
                                            }}
                                        >
                                            <h5 className="mb-2 fw-bold text-sm text-amber-700 d-flex align-items-center">
                                                <MapPin className="me-2 text-amber-500" size={14} />{' '}
                                                Address
                                            </h5>
                                            <p className="mb-0 text-xs text-gray-700">
                                                <Navigation
                                                    className="me-2 text-amber-500 inline-block"
                                                    size={12}
                                                />
                                                <strong>
                                                    {businessData.address.buildingName},
                                                </strong>{' '}
                                                <br />
                                                {businessData.address.streetName}, <br />
                                                {businessData.address.district},{' '}
                                                {businessData.address.state} -
                                                <strong> {businessData.address.pinCode}</strong>
                                            </p>
                                        </motion.div>

                                        {/* Contact Details */}
                                        <motion.div
                                            className="mb-4 p-3 rounded-lg shadow-md bg-gradient-to-r from-emerald-100 to-emerald-200"
                                            whileHover={{
                                                boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                                scale: 1.02,
                                            }}
                                        >
                                            <h5 className="mb-2 text-sm text-emerald-700">
                                                Contact Details
                                            </h5>
                                            <div className="d-flex flex-column gap-2">
                                                <ContactItem
                                                    icon={
                                                        <Phone
                                                            className="text-blue-500"
                                                            size={12}
                                                        />
                                                    }
                                                    label="Primary"
                                                    value={`${businessData.contactDetails.primaryCountryCode} ${businessData.contactDetails.primaryNumber}`}
                                                />
                                                {businessData.contactDetails.secondaryNumber && (
                                                    <ContactItem
                                                        icon={
                                                            <Phone2
                                                                className="text-indigo-500"
                                                                size={12}
                                                            />
                                                        }
                                                        label="Secondary"
                                                        value={`${businessData.contactDetails.secondaryCountryCode} ${businessData.contactDetails.secondaryNumber}`}
                                                    />
                                                )}
                                                <ContactItem
                                                    icon={
                                                        <FaWhatsapp
                                                            className="text-green-500"
                                                            size={12}
                                                        />
                                                    }
                                                    label="WhatsApp"
                                                    value={`${businessData.contactDetails.whatsappCountryCode} ${businessData.contactDetails.whatsAppNumber}`}
                                                />
                                                <ContactItem
                                                    icon={
                                                        <Mail className="text-red-500" size={12} />
                                                    }
                                                    label="Email"
                                                    value={businessData.contactDetails.email}
                                                />
                                                {businessData.contactDetails.website && (
                                                    <ContactItem
                                                        icon={
                                                            <Globe
                                                                className="text-purple-500"
                                                                size={12}
                                                            />
                                                        }
                                                        label="Website"
                                                        value={
                                                            <a
                                                                href={
                                                                    businessData.contactDetails
                                                                        .website
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-decoration-none text-purple-600 hover:text-purple-700 hover:underline text-xs"
                                                            >
                                                                {
                                                                    businessData.contactDetails
                                                                        .website
                                                                }
                                                            </a>
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Enconnect URL */}
                                        {businessData.enconnectUrl && (
                                            <motion.div
                                                className="p-3 rounded-lg shadow-md bg-gradient-to-r from-purple-100 to-purple-200"
                                                whileHover={{
                                                    boxShadow: '0px 8px 15px rgba(0,0,0,0.1)',
                                                    scale: 1.02,
                                                }}
                                            >
                                                <h5 className="mb-2 text-sm text-purple-700 d-flex align-items-center">
                                                    <LinkIcon
                                                        className="me-2 text-purple-500"
                                                        size={12}
                                                    />{' '}
                                                    Enconnect URL
                                                </h5>
                                                <motion.a
                                                    href={businessData.enconnectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none text-break text-purple-600 hover:text-purple-700 hover:underline d-flex align-items-center text-xs"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    {businessData.enconnectUrl}
                                                </motion.a>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </Col>
                            </Row>
                        </motion.div>
                    </AnimatePresence>

                    <ShareButton
                        // theme={colorTheme}
                        // saveContactDetails={saveContact}
                        logoUrl={businessData?.logo}
                        businessName={businessData?.businessName}
                        number={businessData?.contactDetails?.whatsAppNumber}
                        countryCode={businessData?.contactDetails?.whatsappCountryCode}
                    />

                    <a href="#" className="btn btn-lg btn-bottom btn-lg-square back-to-top">
                        <i className="bi bi-arrow-up"></i>
                    </a>
                </>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

const ContactItem = ({ icon, label, value }) => (
    <motion.p
        className="mb-1 d-flex align-items-center flex-wrap"
        whileHover={{ x: 5, color: '#059669' }}
    >
        <span className="me-2">{icon}</span>
        <strong>{label}:</strong>{' '}
        <span
            className="ms-1 fs-14 text-gray-700 text-break"
            style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
        >
            {value}
        </span>
    </motion.p>
);
