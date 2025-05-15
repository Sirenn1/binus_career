import React, { useState } from 'react';
import axios from 'axios';
import { PICData } from './RegisterPICAndCompany';

interface Props {
  picData: PICData;
}

const CompanyFormStep: React.FC<Props> = ({ picData }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyAccountUsername, setCompanyAccountUsername] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [fax, setFax] = useState('');
  const [websiteAddress, setWebsiteAddress] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [twitter, setTwitter] = useState('');
  const [line, setLine] = useState('');
  const [bippMemberType, setBippMemberType] = useState('');
  const [companyLogoPath, setCompanyLogoPath] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const companyRes = await axios.post('/api/company', {
        companyName,
        companyAccountUsername,
        companyAddress,
        country,
        postalCode,
        companyEmail,
        phoneNumber,
        companyType,
        abbreviation,
        province,
        city,
        businessType,
        fax,
        websiteAddress,
        facebook,
        instagram,
        linkedIn,
        twitter,
        line,
        bippMemberType,
        companyLogoPath
      });

      const companyId = companyRes.data.id;

      await axios.post('/api/pic', {
        ...picData,
        companyId,
      });

      alert('PIC and Company registered successfully!');
    } catch (err) {
      console.error(err);
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Company Name"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Account Username *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Company Account Username"
          value={companyAccountUsername}
          onChange={e => setCompanyAccountUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Address *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Company Address"
          value={companyAddress}
          onChange={e => setCompanyAddress(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Country *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Country"
          value={country}
          onChange={e => setCountry(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Postal Code"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Email *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="email"
          placeholder="Company Email"
          value={companyEmail}
          onChange={e => setCompanyEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Type *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Company Type"
          value={companyType}
          onChange={e => setCompanyType(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Abbreviation</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Abbreviation"
          value={abbreviation}
          onChange={e => setAbbreviation(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Province</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Province"
          value={province}
          onChange={e => setProvince(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Business Type</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Business Type"
          value={businessType}
          onChange={e => setBusinessType(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fax</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Fax"
          value={fax}
          onChange={e => setFax(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Website Address</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Website Address"
          value={websiteAddress}
          onChange={e => setWebsiteAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Facebook</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Facebook"
          value={facebook}
          onChange={e => setFacebook(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Instagram</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Instagram"
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="LinkedIn"
          value={linkedIn}
          onChange={e => setLinkedIn(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Twitter</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Twitter"
          value={twitter}
          onChange={e => setTwitter(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Line</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Line"
          value={line}
          onChange={e => setLine(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">BIPP Member Type</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="BIPP Member Type"
          value={bippMemberType}
          onChange={e => setBippMemberType(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company Logo Path</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Company Logo Path"
          value={companyLogoPath}
          onChange={e => setCompanyLogoPath(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Registration
      </button>
    </form>
  );
};

export default CompanyFormStep;
