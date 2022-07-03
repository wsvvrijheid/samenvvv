const postContentData = {
  en: `
    Law should be applied equally to all
    Law is for everyone.
    Everyone is equal before the law.
    Respect for human rights is a requirement of being human.
  `,
  tr: `
    Hukuk herkese eşit uygulanmalı 
    Hukuk herkese lazım.
    Yasalar karşısında herkes eşittir.
    İnsan haklarına saygı insan olmanın gereğidir.
    Bırakın adalet yerini bulsun, isterse kıyamet kopsun.
    Haksızlık yapıp tüm insanlarla birlikte olmaktansa, adaletli davranıp tek başına kalmak daha iyidir.
    Toplumda en büyük güveni her şeyin sonunda adil bir mahkemenin bulunabileceği inancı sağlar.
    En yıkıcı, en öldürücü yara haksızlık yarasıdır.
    Ne zulüm, ne merhamet yalnızca adalet.
    İnsanlar ancak adaletle doyurulur.
    Adalet önce devletten gelir.
    Bir yanı dinlemeden karar veren, doğru karar vermiş olsa bile adaletsizlik etmiş sayılır.
    Allah, hak ve adaletle idare edenleri sever.
    Birtek kişiye yapılan bir haksızlık, bütün topluma yapılan bir tehdittir.
    Hiçbir şey devlete yasalara saygılı olmak kadar yaraşmaz.
    İnsancıl olmadıkça adil olamazsın
    Bir rejim, halkın adalete inanmaz bir hale geldiği noktaya gelince o rejim mahkum olmuştur.
    Adalet kutup yıldızı gibi yerinde durur ve geri kalan herşey onun etrafında döner.
    Adaletin gecikmesi, adaletsizliktir.
    Adalet olmadan düzen olmaz.
    Adaletsizliği işleyen, çekenden daha sefildir.
    Adaletin hedef ve gayesi eşitliği sağlamaktır.
    Hukuk ile medeniyet ve kültürleri arasında ahenk kuramayan cemiyetler bedbahttırlar.
    Mal cimride, silah korkaklarda, karar da zayıflarda olursa düzen bozuktur.
    Hukukun buyrukları şunlardır: Dürüst yaşamak, başkasına zarara uğratmamak, herkesin hakkını vermek.
    Ahlağın olmadığı yerde kanun birşey yapamaz.
    Hükümdar haksız olarak bir köylüden yumurta alırsa, adamları köylünün bütün tavuklarını alır.
    Suçlunun beraat ettiği yerde yargıç hüküm giyer.
    Adaletin küçüldüğü ülkelerde, büyük olan artık suçlulardır.
    Adalet topaldır, ağır yürür fakat gideceği yere ergeç varır.
    Adalet ancak hakikatten, saadet ancak adaletten doğabilir.
    Hak yerde kalmaz.
    Ne kadar yüksekte olursan ol, yasalar senden de yüksektir.
    Yasaların bittiği yerde zulüm başlar.
    Hak deyince akan sular durur.
    Yasama, yürütme yargı içiçe geçmişse, özgürlükler garantide değilse, anayasa yok demektir.
    Bir toplumda suç varsa, orada adalet yoktur.
  `,
  nl: `
    De wet moet voor iedereen gelijk worden toegepast
    Recht is voor iedereen.
    Iedereen is gelijk voor de wet.
    Respect voor mensenrechten is een vereiste om mens te zijn.
  `,
}

export const getRandomPostSentence = (locale: StrapiLocale): string => {
  const sentencesStr = postContentData[locale as 'en' | 'tr' | 'nl']
  const sentences = sentencesStr.slice(1).split('\n')
  const randomIndex = Math.floor(Math.random() * (sentences.length - 1))
  const randomSentence = sentences[randomIndex].trim()

  return randomSentence
}
