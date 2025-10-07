import question from '../../assets/images/cuate.svg'


export default function AboutSection() {
  return (
    <section className="bg-[#63132B] text-white h-[100vh] py-10 px-6 md:px-16">

        <h2 className="text-3xl font-bold text-end p-7 md:py-10">عن المنصة</h2>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* النصوص */}
        <div className="md:w-1/2 text-right space-y-4">
          <p className="leading-relaxed text-[30px] p-7">
            منصة أسناد تساعدك في تحقيق أهدافك بسهولة،
            وتخلي عنك عناء إنجاز مهامك مهما كانت. 
            منصة أسناد تدعمك في تحقيق أهدافك من خلال 
            تسهيل إنجاز مهامك، مهما كانت طبيعتها.
          </p>
        </div>
        

        {/* الصورة */}
        <div className="md:w-1/2 flex justify-center">
          <img 
            src={question} 
            alt="عن المنصة" 
            className="max-w-[250px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
