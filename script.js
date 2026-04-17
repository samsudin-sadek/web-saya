// TAMPILKAN NAMA
//✅ Baru:
let daftarHobi = JSON.parse(localStorage.getItem("hobi")) || [];
const tampilkanNama = () => {

    let nama = document.getElementById("namaInput").value;

    if (nama === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    document.getElementById("hasilNama").innerHTML = `Halo ${nama} 👋`;
}

//let daftarHobi = [];
//let daftarHobi = JSON.parse(localStorage.getItem("hobi")) || [];
// TAMBAH HOBI
const tambahHobi = () => {
    let input = document.getElementById("hobiInput");
    let hobi = input.value;

    if (hobi === "") {
        alert("Hobi tidak boleh kosong!");
        return;
    }

    daftarHobi.push(hobi);

    // ✅ SIMPAN KE LOCAL STORAGE
    localStorage.setItem("hobi", JSON.stringify(daftarHobi));

    renderHobi();

    input.value = "";
}


const renderHobi = () => {
    let list = document.getElementById("listHobi");
    list.innerHTML = "";

    daftarHobi.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item;

        li.onclick = () => {
            daftarHobi.splice(index, 1);
            localStorage.setItem("hobi", JSON.stringify(daftarHobi));
            renderHobi();
        };

        list.appendChild(li);
    });
}
let semuaUser = [];
const ambilData = async () => {
    let loading = document.getElementById("loading");
    let errorText = document.getElementById("error");
    let list = document.getElementById("dataUser");

    loading.style.display = "block";
    errorText.innerHTML = "";
    list.innerHTML = "";

    try {
        let response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
            throw new Error("Gagal mengambil data!");
        }

        let data = await response.json();

        loading.style.display = "none";

        semuaUser = data.users; // simpan ke global

        renderUser(semuaUser);

    } catch (error) {
        loading.style.display = "none";
        errorText.innerHTML = "❌ " + error.message;
    }
}

const renderUser = (users) => {
    let list = document.getElementById("dataUser");
    list.innerHTML = "";

    users.forEach(user => {
        let li = document.createElement("li");
        li.textContent = `${user.firstName} ${user.lastName}`;
        list.appendChild(li);
    });
}
const cariUser = () => {
    let keyword = document.getElementById("searchInput").value.toLowerCase();

    let hasil = semuaUser.filter(user => {
        let nama = `${user.firstName} ${user.lastName}`.toLowerCase();
        return nama.includes(keyword);
    });

    renderUser(hasil);
}
const hapusSemua = () => {
    localStorage.removeItem("hobi");
    daftarHobi = [];
    renderHobi();
}

document.getElementById("searchInput")
    .addEventListener("keyup", cariUser);
ambilData();
renderHobi();