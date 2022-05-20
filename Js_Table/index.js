var kisi_verileri = [];

var deger;
if (localStorage.getItem("kisi_verileri") !== null) {
  kisi_verileri = JSON.parse(localStorage.getItem("kisi_verileri"));
}
var kisi = document.querySelector("#kisi_listesi");
duzenleme_var_mi = false;

function kisi_listesi_yazdir() {
  kisi.innerHTML = "";
  sayac = 1;
  sira_sayaci = 0;
  deger = document.getElementById("satir_sayisi").value;

  if (deger == -1) {
    deger = kisi_verileri.length;
  }
  for (let i of kisi_verileri) {
    sira_sayaci++;
    if (sira_sayaci <= deger) {
      var kisi_bilgisi = `
    <tr >
        <th scope="row">${sayac}</th>
        <td>${i.id}</td>
        <td>${i.isim}</td>
        <td>${i.soyisim}</td>
        <td>${i.telefon}</td>
        <td>${i.mail}</td>
        <td>${i.yas}</td>
        <td>
        <button
        class="duzenle_butonu"
        onclick='return duzenleme_islemi(${i.id},"${i.isim}","${i.soyisim}","${i.telefon}","${i.mail}","${i.dt}")'
        type="submit"
        class="btn bg-success"
      >
        <i class="fa-solid fa-pen"></i>
        Düzenle
      </button>
      <button
        class="silme_butonu"
        onclick="return silme_islemi(${i.id})"
        type="submit"
        class="btn bg-danger float-end"
      >
        <i class="fas fa-trash"></i>
        Sil
      </button>
                       
        </td>
    </tr>
`;

      kisi.insertAdjacentHTML("beforeend", kisi_bilgisi);
      sayac++;

      var buton_ekle = parseInt(kisi_verileri.length / deger);
      document.querySelector("tablo");
      var kalan = kisi_verileri.length % deger;
      var element = document.querySelectorAll("#siralama");
      if (element != null) {
        var num = document.querySelectorAll("#siralama").length;
        for (let i = 0; i < num; i++) {
          document.querySelector("#siralama").remove();
        }
      }
      if (kalan == 0) {
        for (let i = 1; i <= buton_ekle; i++) {
          var buton = `
      <button value=${i} id="siralama">${i}</button>`;
          tablo.insertAdjacentHTML("afterend", buton);
        }
      } else {
        for (let i = 1; i <= buton_ekle + 1; i++) {
          var buton = `
            <button value=${i} id="siralama">${i}</button>`;
          tablo.insertAdjacentHTML("afterend", buton);
        }
      }
      //   console.log(document.querySelector("#siralama"));
    }
  }
}
kisi_listesi_yazdir();

const searchInput = document.getElementById("arama");
const rows = document.querySelectorAll("tbody tr");
console.log(rows);
searchInput.addEventListener("keyup", function (event) {
  const q = event.target.value;
  rows.forEach((row) => {
    row.querySelector("td").textContent.startsWith(q)
      ? (row.style.display = "table-row")
      : (row.style.display = "none");
  });
});

var guncel_tarih = new Date().getFullYear();
var isim_input = document.getElementById("isim_bilgisi_ekle");
var soyisim_input = document.getElementById("soyisim_bilgisi_ekle");
var tel_input = document.getElementById("telefon_bilgisi_ekle");
var mail_input = document.getElementById("mail_bilgisi_ekle");
var yil_input = document.querySelector("#dy_bilgisi_ekle");
var body_kısmı = document.getElementById("body_kısmı");

document
  .getElementById("ekle_butonu")
  .addEventListener("click", listeye_kisi_ekle);

body_kısmı.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("ekle_butonu").click();
  }
});

function random_func() {
  var id = parseInt(Math.random() * 10000000000);
  return id;
}

function listeye_kisi_ekle(event) {
  var random_id = random_func();
  let eski_kisi_sayisi = kisi_verileri.length;
  for (let id_kontrol of kisi_verileri) {
    if (id_kontrol.id == random_id) {
      random_id = random_func();
    }
  }
  if (
    isim_input.value == "" ||
    soyisim_input.value == "" ||
    tel_input.value == "" ||
    mail_input.value == "" ||
    yil_input.value == ""
  ) {
    alert("Eksik Bilgi Girdiniz");
  } else {
    if (duzenleme_var_mi == false) {
      kisi_verileri.push({
        id: random_id,
        isim: isim_input.value,
        soyisim: soyisim_input.value,
        telefon: tel_input.value,
        mail: mail_input.value,
        dt: yil_input.value,
        dy: String(yil_input.value.slice(0, 4)),
        yas: guncel_tarih - parseInt(yil_input.value.slice(0, 4)),
      });
    } else {
      for (let i of kisi_verileri) {
        if (i.id == düzenlenen_id) {
          (i.isim = isim_input.value),
            (i.soyisim = soyisim_input.value),
            (i.tel = tel_input.value),
            (i.mail = mail_input.value),
            (i.dt = yil_input.value),
            (i.dy = String(yil_input.value.slice(0.4))),
            (i.yas = guncel_tarih - parseInt(i.dy));
        }
        duzenleme_var_mi = false;
      }
    }
    isim_input.value = "";
    soyisim_input.value = "";
    tel_input.value = "";
    mail_input.value = "";
    yil_input.value = "";
    localStorage.setItem("kisi_verileri", JSON.stringify(kisi_verileri));
    kisi_listesi_yazdir(deger);
  }
  var guncek_kisi_sayisi = kisi_verileri.length;
  if (guncek_kisi_sayisi > eski_kisi_sayisi) {
    alert("Veri Başarıyla Eklendi");
  }
}

function silme_islemi(id) {
  var silinecek_veri;
  if (confirm(`ID'si ${id} Olan Kişi Silinsin mi?"`)) {
    for (let i of kisi_verileri) {
      if (i.id == id) silinecek_veri = kisi_verileri.indexOf(i);
    }
    kisi_verileri.splice(silinecek_veri, 1);
    localStorage.setItem("kisi_verileri", JSON.stringify(kisi_verileri));
    kisi_listesi_yazdir();
  } else {
    return false;
  }
}

function duzenleme_islemi(id, ad, soyad, tel, mail, tarih) {
  if (confirm(`ID'si ${id} Olan Veriyi Düzenlemek İstiyor Musunuz?`)) {
    duzenleme_var_mi = true;
    düzenlenen_id = id;
    isim_input.value = ad;
    isim_input.focus();
    soyisim_input.value = soyad;
    tel_input.value = tel;
    mail_input.value = mail;
    yil_input.value = tarih;
    localStorage.setItem("kisi_verileri", JSON.stringify(kisi_verileri));
  } else {
    return false;
  }
}
