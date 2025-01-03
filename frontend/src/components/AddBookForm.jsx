import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './AddBookForm.css'; // Import the CSS file for styles

const HOST = 'http://192.168.1.118:5000/';

const AddBookForm = ({ libraries = [], conditions = [], intents = [], categories = []}) => {
    /* const [libraries, setLibraries] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [intents, setIntents] = useState([]);
    const [categories, setCategories] = useState([]); */
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        type: '',
        category: '',
        condition: 3,
        location: 'Estante1',
        wishlist: false,
        intent: 4,
        library: 'Living',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        // Send form data to the backend
        fetch(HOST + '/libros', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then((data) => {
              console.log('Success:', data);
              setFormData({
                  title: '',
                  author: '',
                  year: '',
                  type: '',
                  category: '',
                  condition: 3,
                  location: 'Estante1',
                  wishlist: false,
                  intent: 4,
                  library: 'Living',
              });
          })
          .catch((error) => {
              console.error('Error:', error);
          });
  };

    return (
        <div className="form-container">
            <h2 className="form-title">Agregar Libro</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">
                        Titulo:
                        <input
                            type="text"
                            name="title"
                            className="form-input"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Autor:
                        <input
                            type="text"
                            name="author"
                            className="form-input"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Año:
                        <input
                            type="number"
                            name="year"
                            className="form-input"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Tipo:
                        <input
                            type="text"
                            name="type"
                            className="form-input"
                            value={formData.type}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Categoria:
                        <select
                            name="category"
                            className="form-select"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccionar Tematica</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Condicion:
                        <select
                            name="condition"
                            className="form-select"
                            value={formData.condition}
                            onChange={handleChange}
                            required
                        >
                            <option value="">En que condicion está?</option>
                            {conditions.map((condition) => (
                                <option key={condition.id} value={condition.id}>
                                    {condition.value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Biblioteca:
                        <select
                            name="library"
                            className="form-select"
                            value={formData.library}
                            onChange={handleChange}
                            required
                        >
                            <option value="">En que biblioteca se encuentra?</option>
                            {libraries.map((library) => (
                                <option key={library.nombre} value={library.nombre}>
                                    {library.nombre}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Ubicacion:
                        <input
                            type="text"
                            name="location"
                            className="form-input"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group form-checkbox-container">
                    <label className="form-label">
                        Para Leer:
                        <input
                            type="checkbox"
                            name="wishlist"
                            className="form-checkbox"
                            checked={formData.wishlist}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Fin:
                        <select
                            name="intent"
                            className="form-select"
                            value={formData.intent}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Destino</option>
                            {intents.map((intent) => (
                                <option key={intent.id} value={intent.id}>
                                    {intent.value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit" className="form-button">
                    Agregar
                </button>
            </form>
        </div>
    );
};
AddBookForm.propTypes = {
    libraries: PropTypes.arrayOf(PropTypes.object),
    conditions: PropTypes.arrayOf(PropTypes.object),
    intents: PropTypes.arrayOf(PropTypes.object),
    categories: PropTypes.arrayOf(PropTypes.object),
  };

export default AddBookForm;