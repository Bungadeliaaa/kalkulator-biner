document.addEventListener('DOMContentLoaded', function() {
    const bilangan1Input = document.getElementById('bilangan-1');
    const bilangan2Input = document.getElementById('bilangan-2');
    const tipeBilangan1Select = document.getElementById('tipe-bilangan-1');
    const tipeBilangan2Select = document.getElementById('tipe-bilangan-2');
    const operatorSelect = document.getElementById('operator');
    const hitungButton = document.getElementById('hitung');
    const hasilBiner = document.getElementById('hasil-biner');
    const hasilDesimal = document.getElementById('hasil-desimal');
    const hasilOktal = document.getElementById('hasil-oktal');
    const hasilHeksa = document.getElementById('hasil-heksa');

    // Fungsi untuk memvalidasi input berdasarkan jenis bilangan
    function validasiInput(bilangan, jenis) {
        if (!bilangan) return false;
        
        const regexMap = {
            'biner': /^[01]+$/,
            'desimal': /^-?\d+$/,
            'oktal': /^[0-7]+$/,
            'heksa': /^[0-9A-Fa-f]+$/
        };
        
        return regexMap[jenis].test(bilangan);
    }

    // Fungsi untuk mengkonversi bilangan ke desimal
    function keDesimal(bilangan, jenis) {
        if (jenis === 'biner') {
            return parseInt(bilangan, 2);
        } else if (jenis === 'oktal') {
            return parseInt(bilangan, 8);
        } else if (jenis === 'heksa') {
            return parseInt(bilangan, 16);
        }
        return parseInt(bilangan, 10);
    }

    // Fungsi untuk melakukan operasi aritmatika
    function operasiAritmatika(bil1, bil2, operator) {
        switch (operator) {
            case '+': return bil1 + bil2;
            case '-': return bil1 - bil2;
            case '*': return bil1 * bil2;
            case '/': return bil1 / bil2;
            default: return bil1 + bil2;
        }
    }

    function tampilkanHasil(hasil) {
        // Convert to binary using Two's Complement for negative numbers
        if (hasil < 0) {
            // Perform Two's complement for the negative number
            const bits = 8;  // Define the number of bits
            const twoComplement = (1 << bits) + hasil;  // add 2^n to the negative number
            hasilBiner.textContent = (twoComplement).toString(2).padStart(bits, '0');
        } else {
            hasilBiner.textContent = hasil.toString(2);
        }
        hasilDesimal.textContent = hasil.toString(10);
        hasilOktal.textContent = hasil.toString(8);
        hasilHeksa.textContent = hasil.toString(16).toUpperCase();
    }

    
    // Event listener untuk tombol hitung
    hitungButton.addEventListener('click', function() {
        const bilangan1 = bilangan1Input.value.trim();
        const bilangan2 = bilangan2Input.value.trim();
        const tipeBilangan1 = tipeBilangan1Select.value;
        const tipeBilangan2 = tipeBilangan2Select.value;
        const operator = operatorSelect.value;

        // Validasi input
        if (!validasiInput(bilangan1, tipeBilangan1)) {
            alert(`Bilangan pertama tidak valid untuk jenis ${tipeBilangan1}`);
            return;
        }

        if (!validasiInput(bilangan2, tipeBilangan2)) {
            alert(`Bilangan kedua tidak valid untuk jenis ${tipeBilangan2}`);
            return;
        }

        // Konversi ke desimal
        const bil1Desimal = keDesimal(bilangan1, tipeBilangan1);
        const bil2Desimal = keDesimal(bilangan2, tipeBilangan2);

        // Lakukan operasi
        const hasil = operasiAritmatika(bil1Desimal, bil2Desimal, operator);

        // Tampilkan hasil
        tampilkanHasil(hasil);
    });

    // Event listener untuk memvalidasi input saat diketik
    bilangan1Input.addEventListener('input', function() {
        const jenis = tipeBilangan1Select.value;
        if (!validasiInput(this.value, jenis)) {
            this.style.borderColor = '#ff3860';
        } else {
            this.style.borderColor = '#6e45e2';
        }
    });

    bilangan2Input.addEventListener('input', function() {
        const jenis = tipeBilangan2Select.value;
        if (!validasiInput(this.value, jenis)) {
            this.style.borderColor = '#ff3860';
        } else {
            this.style.borderColor = '#6e45e2';
        }
    });
});
