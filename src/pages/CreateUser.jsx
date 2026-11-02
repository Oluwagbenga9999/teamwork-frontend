import { useState } from 'react';
import { api } from '../api';

const EMPTY = {
  firstName: '', lastName: '', email: '', password: '',
  gender: '', jobRole: '', department: '', address: '',
};

const TEXT_FIELDS = [
  { name: 'firstName', label: 'First name', required: true, autoComplete: 'off' },
  { name: 'lastName', label: 'Last name', required: true, autoComplete: 'off' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'off' },
  { name: 'password', label: 'Temporary password', type: 'password', required: true, minLength: 8, autoComplete: 'new-password' },
  { name: 'jobRole', label: 'Job role' },
  { name: 'department', label: 'Department' },
  { name: 'address', label: 'Address' },
];

export default function CreateUser() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      // The response also contains a token for the new user. We deliberately ignore it
      // so the admin stays signed in as themselves.
      const data = await api.createUser(form);
      setSuccess(`Account created for ${form.firstName} ${form.lastName} (user #${data.userId}).`);
      setForm(EMPTY);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create employee account</h1>

      {TEXT_FIELDS.slice(0, 4).map((f) => (
        <div key={f.name} className="field">
          <label htmlFor={f.name}>{f.label}</label>
          <input id={f.name} name={f.name} type={f.type || 'text'} value={form[f.name]}
            required={f.required} minLength={f.minLength} autoComplete={f.autoComplete}
            onChange={handleChange} />
        </div>
      ))}

      <div className="field">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Prefer not to say</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </div>

      {TEXT_FIELDS.slice(4).map((f) => (
        <div key={f.name} className="field">
          <label htmlFor={f.name}>{f.label}</label>
          <input id={f.name} name={f.name} value={form[f.name]} onChange={handleChange} />
        </div>
      ))}

      {error && <p role="alert" className="form-error">{error}</p>}
      {success && <p role="status" className="form-success">{success}</p>}

      <button type="submit" disabled={saving}>
        {saving ? 'Creating...' : 'Create account'}
      </button>
    </form>
  );
}