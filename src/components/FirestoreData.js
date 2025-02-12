import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore instance
import styles from './FetchActivations.module.css'; // Import CSS module

const FetchActivations = () => {
    const [activations, setActivations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActivations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'activations'));
                const activationList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setActivations(activationList);
            } catch (err) {
                setError('Error fetching activations.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchActivations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'activations', id));
            setActivations((prevActivations) => prevActivations.filter((activation) => activation.id !== id));
        } catch (err) {
            console.error('Error deleting activation:', err);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Activation Messages [{activations.length}]</h2>
            {loading ? (
                <p className={styles.loader}>Loading...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : activations.length === 0 ? (
                <p className={styles.noRecords}>No activation records found.</p>
            ) : (
                <ul className={styles.list}>
                    {activations.map((activation) => (
                        <li key={activation.id} className={styles.card}>
                            <strong className={styles.username}>{activation.username}:</strong> {activation.message}
                            <p className={styles.timestamp}>
                                {activation.timestamp ? new Date(activation.timestamp.seconds * 1000).toLocaleString() : 'No timestamp'}
                            </p>
                            <button className={styles.deleteButton} onClick={() => handleDelete(activation.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FetchActivations;
