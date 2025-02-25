// Yardımcı fonksiyonlar
class Utils {
    // XML formatlama
    static formatXML(xml) {
        let formatted = '';
        let reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;

        xml.split('\r\n').forEach(function (node) {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad != 0) pad -= 4;
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 4;
            } else {
                indent = 0;
            }

            let padding = '';
            for (let i = 0; i < pad; i++) {
                padding += ' ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });

        return formatted;
    }

    // Toast bildirimi gösterme
    static showToast(message, type = 'info') {
        const toastId = `toast-${Date.now()}`;
        const bgColor = type === 'error' ? 'bg-danger' : 
                        type === 'success' ? 'bg-success' : 
                        type === 'warning' ? 'bg-warning' : 
                        'bg-info';
        const textColor = type === 'warning' ? 'text-dark' : 'text-white';
        
        const toastHtml = `
            <div id="${toastId}" class="toast ${bgColor} ${textColor}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header ${bgColor} ${textColor}">
                    <strong class="me-auto">
                        ${type === 'error' ? '<i class="bi bi-x-circle"></i> Hata' :
                          type === 'success' ? '<i class="bi bi-check-circle"></i> Başarılı' :
                          type === 'warning' ? '<i class="bi bi-exclamation-triangle"></i> Uyarı' :
                          '<i class="bi bi-info-circle"></i> Bilgi'}
                    </strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;

        const container = document.getElementById('toast-container');
        container.insertAdjacentHTML('beforeend', toastHtml);

        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 3000
        });
        
        toast.show();

        // Toast'ı gösterdikten sonra DOM'dan kaldır
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    // Tooltip başlatma
    static initializeTooltips() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // Session kontrolü
    static checkSession() {
        if (!window.sessionId) {
            this.showToast('Önce authentication yapmalısınız!', 'warning');
            return false;
        }
        return true;
    }

    // API isteği gönderme
    static async sendAPIRequest(input) {
        try {
            const response = await $.ajax({
                type: "POST",
                url: CONFIG.API_URL,
                data: input
            });

            const xmlString = this.formatXML(new XMLSerializer().serializeToString(response));
            $('#response').text(xmlString);
            console.log('Response:', xmlString);

            return response;
        } catch (error) {
            console.error('Error:', error);
            $('#response').text('Hata: ' + error);
            this.showToast('Bir hata oluştu: ' + error, 'danger');
            throw error;
        }
    }
} 