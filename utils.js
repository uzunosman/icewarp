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
    static showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        document.getElementById('toast-container').appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', function () {
            toast.remove();
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