import React, { useState } from 'react';
import { PICData } from './RegisterPICAndCompany';

interface Props {
  onNext: (data: PICData) => void;
}

const PICFormStep: React.FC<Props> = ({ onNext }) => {
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [manageIn, setManageIn] = useState('');
  const [positionLevel, setPositionLevel] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salutation, setSalutation] = useState('');
  const [officeExt, setOfficeExt] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [line, setLine] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      contactName,
      email,
      phoneNumber,
      mobilePhoneNumber,
      password,
      manageIn,
      positionLevel,
      jobPosition,
      jobTitle,
      salutation,
      officeExt,
      whatsapp,
      line,
      linkedIn,
      instagram
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Contact Name *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Contact Name"
          value={contactName}
          onChange={e => setContactName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
        <label className="block text-sm font-medium text-gray-700">Mobile Phone Number *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Mobile Phone Number"
          value={mobilePhoneNumber}
          onChange={e => setMobilePhoneNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password *</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Manage In</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Manage In"
          value={manageIn}
          onChange={e => setManageIn(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Position Level</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Position Level"
          value={positionLevel}
          onChange={e => setPositionLevel(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job Position</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Job Position"
          value={jobPosition}
          onChange={e => setJobPosition(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Job Title"
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Salutation</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Salutation"
          value={salutation}
          onChange={e => setSalutation(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Office Extension</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Office Extension"
          value={officeExt}
          onChange={e => setOfficeExt(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
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
        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="LinkedIn"
          value={linkedIn}
          onChange={e => setLinkedIn(e.target.value)}
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

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next: Company Info
      </button>
    </form>
  );
};

export default PICFormStep;
