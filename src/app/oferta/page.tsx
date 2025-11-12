'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  X, 
  Zap, 
  Trophy, 
  Users, 
  Clock, 
  Shield,
  Star,
  TrendingUp,
  Heart,
  Smartphone,
  Calendar,
  Award,
  Target,
  MessageCircle
} from 'lucide-react';

export default function Oferta() {
  const [selectedPlan, setSelectedPlan] = useState<'basico' | 'premium' | 'vip'>('premium');

  const plans = {
    basico: {
      name: 'Plano Básico',
      price: 97,
      originalPrice: 297,
      features: [
        'Plano de exercícios personalizado',
        'Calculadora de calorias e macros',
        'Tracking de progresso',
        'Acesso ao app mobile',
        'Biblioteca de exercícios',
        'Atualizações mensais do plano'
      ],
      notIncluded: [
        'Plano alimentar personalizado',
        'Suporte prioritário',
        'Acompanhamento profissional',
        'Grupo VIP no WhatsApp'
      ]
    },
    premium: {
      name: 'Plano Premium',
      price: 197,
      originalPrice: 597,
      badge: 'MAIS POPULAR',
      features: [
        'Tudo do Plano Básico',
        'Plano alimentar personalizado',
        'Receitas fitness exclusivas',
        'Suporte prioritário 24/7',
        'Ajustes semanais do plano',
        'Grupo exclusivo de alunos',
        'E-book de nutrição esportiva',
        'Calculadora de suplementação'
      ],
      notIncluded: [
        'Acompanhamento 1-on-1',
        'Consultoria nutricional'
      ]
    },
    vip: {
      name: 'Plano VIP',
      price: 397,
      originalPrice: 1497,
      badge: 'MELHOR RESULTADO',
      features: [
        'Tudo do Plano Premium',
        'Acompanhamento profissional 1-on-1',
        'Consultoria nutricional mensal',
        'Ajustes diários do plano',
        'Grupo VIP no WhatsApp',
        'Acesso vitalício ao conteúdo',
        'Certificado de conclusão',
        'Bônus: Curso de mindset',
        'Bônus: Guia de suplementação',
        'Garantia estendida de 60 dias'
      ],
      notIncluded: []
    }
  };

  const currentPlan = plans[selectedPlan];
  const discount = Math.round(((currentPlan.originalPrice - currentPlan.price) / currentPlan.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Oferta Exclusiva - Expira em 24h
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transforme Seu Corpo em 90 Dias
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Junte-se a mais de 50.000 pessoas que já alcançaram seus objetivos com nosso método comprovado
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-12 space-y-12">
        {/* Social Proof */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">50.000+</div>
            <div className="text-sm text-gray-600">Alunos Ativos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">4.9★</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">-12kg</div>
            <div className="text-sm text-gray-600">Perda Média</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">90 dias</div>
            <div className="text-sm text-gray-600">Tempo Médio</div>
          </div>
        </div>

        {/* Seleção de Planos */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Escolha Seu Plano</h2>
            <p className="text-gray-600">Todos os planos incluem garantia de 30 dias</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plano Básico */}
            <Card 
              className={`cursor-pointer transition-all ${selectedPlan === 'basico' ? 'border-emerald-500 border-2 shadow-lg' : 'border-gray-200 hover:border-emerald-300'}`}
              onClick={() => setSelectedPlan('basico')}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plans.basico.name}</CardTitle>
                <CardDescription>Para quem está começando</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">R$ {plans.basico.price}</span>
                    <span className="text-lg text-gray-500 line-through">R$ {plans.basico.originalPrice}</span>
                  </div>
                  <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-0">
                    {discount}% OFF
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plans.basico.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plans.basico.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 opacity-50">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Plano Premium */}
            <Card 
              className={`cursor-pointer transition-all relative ${selectedPlan === 'premium' ? 'border-emerald-500 border-2 shadow-xl scale-105' : 'border-gray-200 hover:border-emerald-300'}`}
              onClick={() => setSelectedPlan('premium')}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 px-4 py-1">
                  {plans.premium.badge}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{plans.premium.name}</CardTitle>
                <CardDescription>Recomendado para melhores resultados</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-emerald-600">R$ {plans.premium.price}</span>
                    <span className="text-lg text-gray-500 line-through">R$ {plans.premium.originalPrice}</span>
                  </div>
                  <Badge className="mt-2 bg-emerald-100 text-emerald-700 border-0">
                    {Math.round(((plans.premium.originalPrice - plans.premium.price) / plans.premium.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plans.premium.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plans.premium.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 opacity-50">
                      <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Plano VIP */}
            <Card 
              className={`cursor-pointer transition-all relative ${selectedPlan === 'vip' ? 'border-emerald-500 border-2 shadow-lg' : 'border-gray-200 hover:border-emerald-300'}`}
              onClick={() => setSelectedPlan('vip')}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 px-4 py-1">
                  {plans.vip.badge}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{plans.vip.name}</CardTitle>
                <CardDescription>Acompanhamento completo e personalizado</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-purple-600">R$ {plans.vip.price}</span>
                    <span className="text-lg text-gray-500 line-through">R$ {plans.vip.originalPrice}</span>
                  </div>
                  <Badge className="mt-2 bg-purple-100 text-purple-700 border-0">
                    {Math.round(((plans.vip.originalPrice - plans.vip.price) / plans.vip.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plans.vip.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Principal */}
        <Card className="border-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl">
          <CardContent className="py-8">
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-2">Plano Selecionado: {currentPlan.name}</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-bold">R$ {currentPlan.price}</span>
                  <div className="text-left">
                    <div className="text-sm text-emerald-100 line-through">R$ {currentPlan.originalPrice}</div>
                    <div className="text-sm font-semibold">Economize R$ {currentPlan.originalPrice - currentPlan.price}</div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-12 py-8 text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Garantir Minha Vaga Agora
                <Zap className="ml-2 w-6 h-6" />
              </Button>

              <div className="space-y-2 text-sm text-emerald-100">
                <p className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Garantia de 30 dias ou seu dinheiro de volta
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Oferta expira em 23h 47min
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Apenas 47 vagas restantes hoje
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefícios */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">O Que Você Vai Receber</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-emerald-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Plano 100% Personalizado</h3>
                <p className="text-sm text-gray-600">Exercícios e dieta adaptados ao seu perfil, objetivo e disponibilidade</p>
              </CardContent>
            </Card>

            <Card className="border-teal-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">App Mobile Completo</h3>
                <p className="text-sm text-gray-600">Acompanhe seu progresso, registre treinos e refeições em qualquer lugar</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Suporte 24/7</h3>
                <p className="text-sm text-gray-600">Tire dúvidas a qualquer momento com nossa equipe especializada</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Tracking de Progresso</h3>
                <p className="text-sm text-gray-600">Monitore peso, medidas, fotos e evolução semana a semana</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Comunidade Exclusiva</h3>
                <p className="text-sm text-gray-600">Conecte-se com milhares de pessoas na mesma jornada que você</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Certificado de Conclusão</h3>
                <p className="text-sm text-gray-600">Receba reconhecimento ao completar seu programa de 90 dias</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">O Que Nossos Alunos Dizem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-emerald-200">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">"Perdi 15kg em 3 meses! O plano personalizado fez toda a diferença. Nunca me senti tão bem!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-emerald-600">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Maria Clara</p>
                    <p className="text-xs text-gray-500">São Paulo, SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-200">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">"Ganhei 8kg de massa muscular! O acompanhamento profissional é incrível. Super recomendo!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-teal-600">RS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Rafael Santos</p>
                    <p className="text-xs text-gray-500">Rio de Janeiro, RJ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">"Melhor investimento que já fiz! Mudou minha vida completamente. Estou irreconhecível!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-purple-600">JO</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Juliana Oliveira</p>
                    <p className="text-xs text-gray-500">Belo Horizonte, MG</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">Perguntas Frequentes</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como funciona a garantia?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Você tem 30 dias para testar o programa. Se não ficar satisfeito, devolvemos 100% do seu dinheiro, sem perguntas.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preciso de equipamentos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Não! Temos planos para treino em casa sem equipamentos e também para academia. Você escolhe.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quanto tempo leva para ver resultados?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">A maioria dos alunos vê mudanças significativas nas primeiras 2-3 semanas. Resultados completos em 90 dias.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso cancelar a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Sim! Não há fidelidade. Você pode cancelar quando quiser, mas temos certeza que não vai querer.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Final */}
        <Card className="border-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl">
          <CardContent className="py-12">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <Trophy className="w-16 h-16 mx-auto" />
              <h2 className="text-4xl font-bold">Pronto Para Transformar Seu Corpo?</h2>
              <p className="text-xl text-emerald-100">
                Junte-se a milhares de pessoas que já alcançaram resultados incríveis. 
                Sua transformação começa agora!
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-bold">R$ {currentPlan.price}</span>
                  <div className="text-left">
                    <div className="text-sm text-emerald-100 line-through">R$ {currentPlan.originalPrice}</div>
                    <Badge className="bg-white text-emerald-600 border-0">
                      {discount}% OFF
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-emerald-100">ou 12x de R$ {(currentPlan.price / 12).toFixed(2)} sem juros</p>
              </div>

              <Button 
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 px-12 py-8 text-xl font-bold shadow-xl hover:shadow-2xl transition-all w-full md:w-auto"
              >
                Começar Minha Transformação Agora
                <Heart className="ml-2 w-6 h-6" />
              </Button>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-emerald-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Acesso imediato
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Garantia de 30 dias
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Pagamento 100% seguro
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
