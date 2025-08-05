/**
 * @fileoverview Clients page wrapper with dynamic header height
 * @author Epoch Development Team
 */

'use client';

import React from 'react';
import { ClientsSection } from '../../sections/ClientsSection';
import { Header } from '../../layout/Header';
import { Footer } from '../../layout/Footer';
import styles from '../../../../styles/ClientsPage.module.css';

export default function ClientsPage() {
  return (
    <>
      <Header />
      <main className={styles.clientsPageMain}>
        <ClientsSection isStandalone={true} />
      </main>
      <Footer />
    </>
  );
}