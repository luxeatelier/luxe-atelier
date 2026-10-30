import React from 'react';

class VCardDownload extends React.Component {
  downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Luxe Atelier
TEL:+919633113288
TEL:+918891880648
TEL:+917994499004
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'LuxeAtelier.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (
      <div>
        <button onClick={this.downloadVCard}>
          <i className="fas fa-download"></i> Download vCard
        </button>
      </div>
    );
  }
}

export default VCardDownload;
